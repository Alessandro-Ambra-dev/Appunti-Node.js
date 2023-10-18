const someTask = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("This is some data"), 2000);
});

console.log(someTask);

someTask.then(
  function (value) {
    console.log(`value: ${value}`);
    console.log("someTask:", someTask);
  },
  function (reason) {
    console.log(`reason:${reason}`);
    console.log("someTask:", someTask);
  }
);

const someMoreTask = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Something went wrong")), 2000);
});

someMoreTask.then(
  function (value) {
    console.log(`value: ${value}`);
    console.log("someTask:", someMoreTask);
  },
  function (reason) {
    console.log(`reason:${reason}`);
    console.log("someTask:", someMoreTask);
  }
);
