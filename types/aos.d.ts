declare module "aos" {
  interface AOSOptions {
    offset?: number
    delay?: number
    duration?: number
    easing?: string
    once?: boolean
    mirror?: boolean
    anchorPlacement?: string
    startEvent?: string
    debounceDelay?: number
    throttleDelay?: number
    disable?: boolean | "phone" | "tablet" | "mobile"
  }

  namespace AOS {
    function init(options?: AOSOptions): void
    function refresh(): void
    function refreshHard(): void
  }

  export default AOS
}
