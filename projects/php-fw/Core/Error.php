<?php

namespace Core;

/**
* -----------------------
* Error/Exception Handler
* -----------------------
*/
class Error {
  /**
  * -------------------------------------------------------
  * Error handler
  * Throw ErrorException to convert Errors to Exceptions
  * @param int $level Error level
  * @param string $message Error message
  * @param string $file Filename where the error got raised
  * @param int $line Files line number
  *
  * @return void
  * -------------------------------------------------------
  */
  public static function errorHandler($level, $message, $file, $line) {
    if (error_reporting() !== 0) {
      throw new \ErrorException($message, 0, $level, $file, $line);
    }
  }

  /**
  * ---------------------------------------
  * Exception handler
  * Handles exceptions
  * @param Exception $exception Error level
  *
  * @return void
  * ---------------------------------------
  */
  public static function exceptionHandler($exception) {
    $code = $exception->getCode();
    if ($code != 404) {
      $code = 500;
    }
    http_response_code($code);

    if (\App\Config::SHOW_ERRORS) {
      echo "<h1>Fatal error</h1>";
      echo "<p>Uncaught exception: " . get_class($exception) . "'</p>";
      echo "<p>Message: " . $exception->getMessage() . "'</p>";
      echo "<p>Stack trace: <pre>" . $exception->getTraceAsString() . "</pre></p>";
      echo "<p>Thrown in '" . $exception->getFile() . "' on line " . $exception->getLine() . "</p>";
    } else {
      $log = dirname(__DIR__) . '/logs/' . date('Y-m-d') . '.txt';
      ini_set('error_log', $log);

      $message = "Uncaught exception: " . get_class($exception) . "'";
      $message .= " with message '" . $exception->getMessage() . "'";
      $message .= "\nStack trace: " . $exception->getTraceAsString();
      $message .= "\nThrown in '" . $exception->getTraceAsString() . "' on line " . $exception->getLine();

      error_log($message);
      View::renderTemplate("$code.html");
    }
  }
}
