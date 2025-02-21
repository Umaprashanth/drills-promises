/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 5 seconds with the
       value {data: "Hello, friend!", error: null}
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Create a first Promise chain using the promise above and
       Print out the resolved value when the first promise fulfills
    6. Have this first promise return another new Promise that will
       fulfill after 2 seconds with the message:
       "First promise chain complete!"
    7. Print out the message from the above promise after it
       fulfills ("First promise chain complete!")

    8. Create a second Promise chain using the first promise above and
       Print out the resolved value when the second promise fulfills
    9. Have this second promise return another new Promise that will
       fulfill after 10 seconds with the message:
       "Second promise chain complete!"
   10. Print out the message from the above promise after it
       fulfills ("Second promise chain complete!")

    HINT: Use setTimeout for the delay
    HINT2: This will be using the same promise two times:
           const myPromise = new Promise(...) // step 2
           myPromise.then(...).then(...) // steps 5-7
           myPromise.then(...).then(...) // steps 8-10

    BONUS: WHY does it work this way?
*/

function promiseGenerator(timeInSeconds,textToPrint){
      return new Promise((resolve, reject) =>{
         setTimeout(()=>{
            resolve(textToPrint)
         },timeInSeconds*1000)
      })
}

function promiseExercise3(){

   console.log("Program started");
   
   let promise1 = promiseGenerator(5,"Hello, friend!")

   console.log(promise1);

   console.log("Program in progress...");
   
   promise1
   .then((data) => {
      console.log(data)
      return promiseGenerator(2,"First promise chain complete!")
   }).then((data)=>{
      console.log(data);
   })

   promise1
   .then((data) => {
      console.log(data)
      return promiseGenerator(10,"Second promise chain complete!")
   }).then((data)=>{
      console.log(data);
   })


      // let testing = promise1
   // .then((data) => {
   //    console.log(data)
   //    return promiseGenerator(2,"First promise chain complete!")
   // }).then((data)=>{
   //    console.log(data);
   // })

   // testing
   // .then(() => {
   //    return promiseGenerator(10,"Second promise chain complete!")
   // }).then((data)=>{
   //    console.log(data);
   // })

}

promiseExercise3()