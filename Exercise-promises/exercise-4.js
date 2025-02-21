/*
    1. Create a Promise that resolves with the number 10 after
       3 seconds
    2. Create another Promise that resolves with the number
       20 after 5 seconds

    How can we log out the sum (30) of these two resolved values
    once, after BOTH promises successfully fulfill?

    HINT: Use Google/Documentation to help find an answer
    HINT2: You can Google for something like:
           "resolve 2 promises at the same time javascript"
*/


function promiseGenerator(timeInSeconds,textToPrint) {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
      resolve(textToPrint)
     },timeInSeconds * 1000);
   });
 }

 function promiseExercise4(){

   let promise1 = promiseGenerator(3,10)

   let promise2 = promiseGenerator(5,20)

   Promise.all([promise1,promise2]).then(([data1,data2]) => {
      console.log(data1+data2)})
      
      // promise1.then((data)=>{
      //    console.log(data);
      //    return promise2.then((data1) => data+data1)
      // }).then((res) => console.log((res))) 

      // promise1.then(()=> promiseGenerator(5,20)).then((data)=> console.log(data))
   }

 promiseExercise4()