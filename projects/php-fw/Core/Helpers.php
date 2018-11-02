<?php

/**
 * =======================
 * Router Helper Functions
 * =======================
*/

/**
* -----------------------------------------------
* Convert string to studlyCaps, including hyphens
* e.g. comment-date => CommentDate
* @param string $string String to be converted
*
* @return string
* -----------------------------------------------
*/
function convertToStudlyCaps($string) {
  return str_replace(' ', '', ucwords(str_replace('-', ' ', $string)));
}

/**
* ----------------------------------------------
* Convert string to camelCase, including hyphens
* e.g. comment-date => commentDate
* @param string $string String to be converted
*
* @return string
* ----------------------------------------------
*/
function convertToCamelCase($string) {
  return lcfirst(convertToStudlyCaps($string));
}

/**
* ----------------------------------------------
* Strip the url from querystring variables
* e.g. root/users?id=1 -> root/users
* @param string $url String to be converted
*
* @return string
* ----------------------------------------------
*/
function removeQueryStringVariables($url) {
  if ($url != '') {
    $parts = explode('?', $url, 2);
    if( strpos($parts[0], '=') === false) {
      $url = $parts[0];
    } else {
      $url = '';
    }
  }
  return $url;
}
