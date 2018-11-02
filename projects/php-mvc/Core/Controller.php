<?php

/**
 * =========================
 * Controller Implementation
 * =========================
*/

namespace Core;

abstract class Controller {
  /**
  * -------------------------------------
  * The parameters from the matched route
  * @var array
  * -------------------------------------
  */
  protected $route_params = [];

  /**
  * -----------------------------------------------------
  * Controller Class constructor
  * @param array $route_params The matched route's params
  *
  * @return void
  * -----------------------------------------------------
  */
  public function __construct($route_params) {
    $this->route_params = $route_params;
  }

 /**
 * ----------------------------------------------------------------------
 * __call is a 'magic' PHP method
 * It is run when accessing non-existent or unaccessible class methods
 *
 * We emulate lifecycle hooks by purposely making actions unaccessible,
 * by naming them 'nameAction' while the router dispatches 'name' actions
 * __call is then run, calling before(), nameAction() and after()
 *
 * @param string $name  Method name
 * @param array $args Arguments to be passed to the Method
 *
 * @return void
 * ----------------------------------------------------------------------
 */
  public function __call($name, $args) {
    $method = $name . 'Action';
    // If method found
    if (method_exists($this, $method)) {
      // && before() returns true (false can be used to stop action)
      if($this->before() !== false) {
        call_user_func_array([$this, $method], $args);
        $this->after();
      }
    } else {
      throw new \Exception("Method $method not found for " . get_class($this));
    }
  }

  /**
  * ---------------------------------------------
  * A filter to be called before an action method
  *
  * @return void
  * ---------------------------------------------
  */
  protected function before() {

  }

  /**
  * --------------------------------------------
  * A filter to be called after an action method
  *
  * @return void
  * --------------------------------------------
  */
  protected function after() {

  }
}
