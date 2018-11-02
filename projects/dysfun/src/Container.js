export const Container = function(val) {
  this.value = val;
}

Container.of = function(val) {
  return new Container(val);
}

Container.prototype.map = function(fn) {
  return Container.of(fn(this.value));
}
