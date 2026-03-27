export class IsMobile {
  current = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.current = window.innerWidth < 768;
      window.addEventListener("resize", () => {
        this.current = window.innerWidth < 768;
      });
    }
  }
}
