<?php

/**
 * ===============
 * Home Controller
 * ===============
*/

namespace App\Controllers;

use \Core\View;

class Home extends \Core\Controller {
  /**
  * --------------------
  * Shows the index page
  * @return void
  * --------------------
  */
  public function indexAction() {
    /*
    View::render('Home/index.php', [
      'name' => 'Bob',
      'routeParams' => print_r($this->route_params, true),
      'queryParams' => print_r($_GET, true)
    ]);
    */

    View::renderTemplate('Home/index.html', [
      'name' => 'Bob',
      'routeParams' => print_r($this->route_params, true),
      'queryParams' => print_r($_GET, true)
    ]);
  }
}
