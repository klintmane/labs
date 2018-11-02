<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <title>Home</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>Hello there <?php echo htmlspecialchars($name);?></p>
    <p>Route Params:</p>
    <pre><?php echo htmlspecialchars($routeParams);?></pre>
    <p>Query Params:</p>
    <pre><?php echo htmlspecialchars($queryParams);?></pre>
  </body>
</html>
