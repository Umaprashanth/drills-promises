/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Step 1 complete" when the first promise fulfills
    6. Have the first promise return another new Promise that will
       fulfill after 3 seconds with the message: "Step 2 Complete"

    7. Print out the message from the second promise after it
       fulfills ("Step 2 Complete")

    HINT: Use setTimeout for the delay
*/

function promiseGenerator(timeInSeconds,textToPrint) {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
      resolve(textToPrint)
     },timeInSeconds * 1000);
   });
 }

function promiseExercise2(){

   console.log("Program started");

   let promise = promiseGenerator(3,"Step 1 complete")

   console.log(promise);
   
   console.log("Program in progress...");
   
   promise.then((data)=> {

      console.log(data)

      return promiseGenerator(3,"Step 2 Complete")

   }).then((data) => console.log(data))

}

promiseExercise2()