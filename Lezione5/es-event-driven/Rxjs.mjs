import { range, filter, map } from "rxjs";

range(1, 40)
  .pipe(
    filter((x) => x % 2 === 1),

    map((x) => x + x)
  )
  .subcribe({
    next: (x) => console.log("Observer got a next value: " + x),
    error: (error) => console.error("Observer got an error: " + error),
    complete: () => console.log("Obeserver got a complete notification"),
  });
