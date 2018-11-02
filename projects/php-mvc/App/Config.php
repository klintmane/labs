<?php

namespace App;

/**
* -----------------
* App Configuration
* -----------------
*/
class Config {
  /**
  * -------------
  * Database Host
  * @var string
  * -------------
  */

  const DB_HOST = 'localhost';
  /**
  * -------------
  * Database Name
  * @var string
  * -------------
  */
  const DB_NAME = 'php-fw-db';

  /**
  * -------------
  * Database User
  * @var string
  * -------------
  */
  const DB_USER = 'root';

  /**
  * -------------
  * Database Password
  * @var string
  * -------------
  */
  const DB_PASSWORD = 'secret';

  /**
  * ------------------------
  * Show/Hide Error messages
  * @var boolean
  * ------------------------
  */
  const SHOW_ERRORS = false;

}
