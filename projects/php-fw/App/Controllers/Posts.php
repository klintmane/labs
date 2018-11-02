<?php

/**
 * ================
 * Posts Controller
 * ================
*/

namespace App\Controllers;
use App\Models\Post;

use \Core\View;

class Posts extends \Core\Controller {
  /**
  * --------------------
  * Shows the index page
  * @return void
  * --------------------
  */
  public function indexAction() {
    $posts = Post::getAll();

    View::renderTemplate('Posts/index.html', [
      'posts' => $posts
    ]);
}

  /**
  * ------------------
  * Shows the new page
  * @return void
  * ------------------
  */
  public function newAction() {
    View::renderTemplate('Posts/new.html');
  }
}
