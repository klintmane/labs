<?php

/**
 * ===================
 * View Implementation
 * ===================
*/

namespace Core;

class View {
  /**
  * ------------------------------------------------
  * Render a View file
  * @param string $view View file
  * @param array $args Data to be passed to the view
  *
  * @return void
  * ------------------------------------------------
  */
  public static function render($view, $args = []) {
    extract($args, EXTR_SKIP);

    $file = "../App/Views/$view";

    if(is_readable($file)) {
      require $file;
    } else {
      throw new \Exception("View $file not found");
    }
  }

  /**
  * ----------------------------------------------------
  * Render a View template file
  * Uses Twig
  * @param string $template Template file
  * @param array $args Data to be passed to the template
  *
  * @return void
  * ----------------------------------------------------
  */
  public static function renderTemplate($template, $args = []) {
    static $twig = null;

    $file = "../App/Views/$template";

    if ($twig === null) {
      $loader = new \Twig_Loader_Filesystem('../App/Views');
      $twig = new \Twig_Environment($loader);
    }

    echo $twig->render($template, $args);
  }

}
