<?php

/**
 * =====================
 * Router Implementation
 * =====================
*/

namespace Core;
include 'Helpers.php';

class Router {
  /**
  * -----------------
  * The Routing Table
  * @var array
  * ------------------
  */
  protected $routes = [];

  /**
  * -----------------
  * Matched Route Params
  * @var array
  * ------------------
  */
  protected $params = [];

  /**
  * -------------------------------------
  * Add a new Route to the Routing Table
  * @param string $route The route (URL)
  * @param array $params Parameters
  *
  * @return void
  * -------------------------------------
  */
  public function new($route, $params = []) {
    // Convert Route to Regexp, forward slashes escaped
    $route = preg_replace('/\//', '\\/', $route);

    // Convert params like {controller}, {action} etc.
    $route = preg_replace('/\{([a-z]+)\}/', '(?P<\1>[a-z-]+)', $route);

    // Convert variables like {id: 2} etc.
    $route = preg_replace('/\{([a-z]+):([^\}]+)\}/', '(?P<\1>\2)', $route);

    // Prepend with delimiter, add case insensitive flag
    $route = '/^' . $route . '$/i';

    $this->routes[$route] = $params;
  }

  /**
  * ---------------------------------
  * Match Route to Routing Table
  * @param string $url The Route URL
  *
  * @return boolean true if Route found, false otherwise
  * ---------------------------------
  */
  public function match($url) {
    foreach ($this->routes as $route => $params) {
      if (preg_match($route, $url, $matches)) {
        // Get named capture group values
        foreach ($matches as $key => $match) {
          if (is_string($key)) {
              $params[$key] = $match;
          }
        }
        $this->params = $params;
        return true;
      }
    }
    return false;
  }

  /**
  * ---------------------------------
  * Dispatch Controller Action
  * @param string $url The Route URL
  *
  * @return void
  * ---------------------------------
  */
  public function dispatch($url) {
    $url = removeQueryStringVariables($url);

    if ($this->match($url)) {
      $controller_name = $this->params['controller'];
      $controller_name = convertToStudlyCaps($controller_name);
      $controller_name = $this->getNamespace() . $controller_name;

      if (class_exists($controller_name)) {
        $controller = new $controller_name($this->params);

        $action_name = $this->params['action'];
        $action_name = convertToCamelCase($action_name);

        if (is_callable([$controller, $action_name])) {
          $controller->$action_name();
        } else {
          throw new \Exception("Controller action $action_name not found in $controller_name");
        }
      } else {
        throw new \Exception("Controller $controller_name not found");
      }
    } else {
      throw new \Exception("No route matched.", 404);
    }
  }

  /**
  * ---------------------------------
  * Get Routes from the Routing Table
  * @return array
  * ---------------------------------
  */
  public function getRoutes() {
    return $this->routes;
  }

  /**
  * ------------------
  * Get matched params
  * @return array
  * ------------------
  */
  public function getParams() {
    return $this->params;
  }

  /**
  * -------------------------------------------------------------------
  * Get the namespace from the params, so controllers can be namespaced
  * @return string
  * -------------------------------------------------------------------
  */
  protected function getNamespace() {
    $namespace = 'App\Controllers\\';
    if (array_key_exists('namespace', $this->params)) {
      $namespace .= $this->params['namespace'] . '\\';
    }

    return $namespace;
  }
}
