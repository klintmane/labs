use std::fs::File;
use std::io::prelude::*;

pub fn from(path: String) -> String {
  let mut file = File::open(&path).expect("Could not open the file");

  let mut contents = String::new();
  file
    .read_to_string(&mut contents)
    .expect("Could not read the file");

  contents
}
