<?php

/**
 * ================
 * Users Controller
 * ================
*/

namespace App\Controllers\Admin;

class Users extends \Core\Controller {
  /**
  * ----------------------
  * Run before the actions
  * ----------------------
  */
  protected function before() {
    // Returning false will stop actions from running, usable e.g.
    // when user is not logged in
    // return false;
  }

  /**
  * --------------------
  * Shows the index page
  * @return void
  * --------------------
  */
  public function indexAction() {
    echo 'Admin Users';
    echo '<p>Route params: <pre>' . htmlspecialchars(print_r($this->route_params, true)) . '</pre></p>';
    echo '<p>Query params: <pre>' . htmlspecialchars(print_r($_GET, true)) . '</pre></p>';
  }
}
