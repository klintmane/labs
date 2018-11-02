<?php

/**
 * ===============================
 * Front Controller Implementation
 * ===============================
*/

/**
* ------------------------------------------
* Require the Twig autoloader for templating
* ------------------------------------------
*/
require_once dirname(__DIR__) . '/vendor/Twig/lib/Twig/Autoloader.php';
Twig_Autoloader::register();

/**
* ----------------------------------------------------------------
* Register autoloader fn to dynamically require namespaced Classes
* ----------------------------------------------------------------
*/
spl_autoload_register(function ($class) {
  $root = dirname(__DIR__);
  $file = $root . '/' . str_replace('\\', '/', $class) . '.php';
  if (is_readable($file)) {
    require($root . '/' . str_replace('\\', '/', $class) . '.php');
  }
});

/**
* ------------------------
* Error/Exception Handling
* ------------------------
*/
error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');

/**
* -----------------
* Initialize Router
* -----------------
*/
$router = new Core\Router();

/**
* -------------
* Define Routes
* -------------
*/
// Static - A route and controller/action params are provided
$router->new('', ['controller' => 'Home', 'action' => 'index']);
$router->new('posts', ['controller' => 'Posts', 'action' => 'index']);
$router->new('admin/users', ['controller' => 'Users', 'action' => 'index', 'namespace' => 'Admin']);

// Dynamic Routes - The controller/action will be
$router->new('{controller}/{action}');
$router->new('{controller}/{id:\d+}/{action}');
$router->new('admin/{controller}/{action}', ['namespace' => 'Admin']);

/**
* ---------------
* Get Request URL
* ---------------
*/
$url = trim($_SERVER['REQUEST_URI'], '/');

/**
* ----------------------------
* Perform Dispatch for the URL
* ----------------------------
*/
$router->dispatch($url);
