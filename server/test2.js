function sayHello(){
	console.log("Hello !");
}

setTimeout(sayHello, 5000);
console.log("1");
setTimeout(sayHello, 5000);
console.log("2");
setTimeout(sayHello, 5000);
console.log("3");

// sync
/*
sayHello();
console.log("1");
sayHello();
console.log("2");
sayHello();
console.log("3");*/
