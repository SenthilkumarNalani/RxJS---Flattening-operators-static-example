import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
// Note: we can see that the next notifications emitted by the source Observable were mapped into other Observables by using 'concatMap' operator.
// Each of the two values caused a new inner Subscription to be made to the 'of' Observable, and all of the values emitted by those inner Subscriptions were flattened to our single output, whichs final results we can see in the console.

const source$ = new Observable((subscriber) => {
  subscriber.next('A');
  subscriber.next('B');
});

source$
  .pipe(concatMap((value) => of(1, 2)))
  .subscribe((value) => console.log(value));

console.log('App has started');

// Note: The next inner subscription happens only after the previous inner subscription is completed
// const source$ = new Observable((subscriber) => {
//   subscriber.next('A');
//   subscriber.next('B');
//   return () => {
//     console.log('main subscription unsubscribed');
//   };
// });

// console.log('App has started');
// source$
//   .pipe(
//     concatMap(
//       (value) =>
//         new Observable((subscriber) => {
//           setTimeout(() => subscriber.next('1'), 2000);
//           setTimeout(() => {
//             subscriber.next('2');
//             if (value === 'B') subscriber.error(new Error('error'));
//             subscriber.complete();
//           }, 5000);
//         })
//     )
//   )
//   .subscribe(
//     (value) => console.log(value),
//     (error) => console.log(error),
//     () => console.log('main subscription completed')
//   );
