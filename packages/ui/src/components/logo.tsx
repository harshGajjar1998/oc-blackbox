import { ComponentProps } from "solid-js"

/**
 * Mark — the Blackbox AI geometric hexagonal mark (standalone icon).
 * Used wherever a compact icon is needed (e.g. tray, small badges).
 * Fills use var(--icon-strong-base) so it adapts to dark/light theme.
 */
export const Mark = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="195.596 226.188 274.408 312.94"
      fill="none"
    >
      <path
        d="M271.304 260.638L195.596 304.431V460.885L236.854 484.751V328.418L312.043 284.911L271.304 260.638Z"
        fill="var(--icon-strong-base)"
      />
      <path
        d="M330.831 226.188L290.274 249.657L331.055 273.899L348.437 284.249L427.972 331.584V413.744L470.004 389.431V309L330.831 226.188Z"
        fill="var(--icon-strong-base)"
      />
      <path
        d="M331.054 491.865L255.977 448.428V495.803L330.83 539.128L470.003 458.606V411.587L414.446 443.645L331.054 491.865Z"
        fill="var(--icon-strong-base)"
      />
    </svg>
  )
}

/**
 * Splash — the Blackbox AI geometric mark used on the loading/splash screen.
 * Same shape as Mark but accepts a ref and data-component attribute for
 * animation targeting.
 */
export const Splash = (props: Pick<ComponentProps<"svg">, "ref" | "class">) => {
  return (
    <svg
      ref={props.ref}
      data-component="logo-splash"
      classList={{ [props.class ?? ""]: !!props.class }}
      viewBox="195.596 226.188 274.408 312.94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M271.304 260.638L195.596 304.431V460.885L236.854 484.751V328.418L312.043 284.911L271.304 260.638Z"
        fill="var(--icon-strong-base)"
      />
      <path
        d="M330.831 226.188L290.274 249.657L331.055 273.899L348.437 284.249L427.972 331.584V413.744L470.004 389.431V309L330.831 226.188Z"
        fill="var(--icon-strong-base)"
      />
      <path
        d="M331.054 491.865L255.977 448.428V495.803L330.83 539.128L470.003 458.606V411.587L414.446 443.645L331.054 491.865Z"
        fill="var(--icon-strong-base)"
      />
    </svg>
  )
}

/**
 * Logo — the full BLACKBOX AI wordmark (mark + text).
 * Extracted from the official logo SVG (clip0 group, bounding box 342 382 506.43 77.91).
 * Fills use var(--icon-strong-base) so it renders white on dark theme and
 * dark on light theme automatically.
 */
export const Logo = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="342 382 506.43 77.91"
      fill="none"
      classList={{ [props.class ?? ""]: !!props.class }}
    >
      {/* Geometric mark (left side of wordmark) */}
      <path
        d="M360.85 390.58L342 401.48V440.43L352.27 446.37V407.45L370.99 396.62L360.85 390.58Z"
        fill="var(--icon-strong-base)"
      />
      <path
        d="M375.67 382L365.57 387.84L375.72 393.88L380.05 396.45L399.85 408.24V428.69L410.32 422.64V402.62L375.67 382Z"
        fill="var(--icon-strong-base)"
      />
      <path
        d="M375.72 448.14L357.03 437.33V449.12L375.67 459.91L410.32 439.86V428.16L396.49 436.14L375.72 448.14Z"
        fill="var(--icon-strong-base)"
      />
      {/* B */}
      <path
        d="M425.53 396.25H456.4L463.43 403.28V417.06L460.62 419.94L465.61 425V437.87L458.02 445.46H425.53V396.25ZM451.48 416.86L454.01 414.33V406.74L451.55 404.28H434.88V416.87H451.48V416.86ZM453.17 437.46L456.19 434.44V427.55L453.17 424.53H434.89V437.47H453.17V437.46Z"
        fill="var(--icon-strong-base)"
      />
      {/* L */}
      <path
        d="M469.83 396.25H479.39V437.39H504V445.48H469.82V396.25H469.83Z"
        fill="var(--icon-strong-base)"
      />
      {/* A */}
      <path
        d="M524.47 396.25H533.19L551.19 445.47H541.49L537.48 434.57H520.18L516.17 445.47H506.47L524.47 396.25ZM535.37 426.7L528.83 407.99H528.69L522.36 426.7H535.37Z"
        fill="var(--icon-strong-base)"
      />
      {/* C */}
      <path
        d="M552.88 437.39V404.34L560.97 396.25H585.02L592.97 404.2V411.72H583.41V407.71L580.11 404.4H566.05L562.46 407.99V433.73L566.05 437.32H580.11L583.41 434.01V430H592.97V437.52L585.02 445.47H560.97L552.88 437.38V437.39Z"
        fill="var(--icon-strong-base)"
      />
      {/* K */}
      <path
        d="M598.24 396.25H607.8V416.85H615.25L627.13 396.25H637.89L623.47 420.79L639.08 445.47H628.11L615.17 425.01H607.79V445.47H598.23V396.25H598.24Z"
        fill="var(--icon-strong-base)"
      />
      {/* B */}
      <path
        d="M642.61 396.25H673.48L680.51 403.28V417.06L677.7 419.94L682.69 425V437.87L675.1 445.46H642.61V396.25ZM668.56 416.86L671.09 414.33V406.74L668.63 404.28H651.96V416.87H668.56V416.86ZM670.25 437.46L673.27 434.44V427.55L670.25 424.53H651.97V437.47H670.25V437.46Z"
        fill="var(--icon-strong-base)"
      />
      {/* O */}
      <path
        d="M687.61 437.39V404.34L695.7 396.25H721.02L729.11 404.34V437.39L721.02 445.48H695.7L687.61 437.39ZM715.95 437.32L719.54 433.73V407.99L715.95 404.4H700.76L697.17 407.99V433.73L700.76 437.32H715.95Z"
        fill="var(--icon-strong-base)"
      />
      {/* X */}
      <path
        d="M747.67 420.09L731.21 396.25H741.97L753.08 412.42L764.19 396.25H774.95L758.49 420.37L775.65 445.48H764.89L753.08 428.11L741.27 445.48H730.51L747.67 420.09Z"
        fill="var(--icon-strong-base)"
      />
      {/* · (dot separator) */}
      <path
        d="M777.41 442.45V437.95L780.43 434.93H785.56L788.51 438.02V442.38L785.56 445.47H780.43L777.41 442.45Z"
        fill="var(--icon-strong-base)"
      />
      {/* A */}
      <path
        d="M808.28 396.25H817L835 445.47H825.3L821.29 434.57H803.99L799.98 445.47H790.28L808.28 396.25ZM819.18 426.7L812.64 407.99H812.5L806.17 426.7H819.18Z"
        fill="var(--icon-strong-base)"
      />
      {/* I */}
      <path
        d="M838.87 396.25H848.43V445.47H838.87V396.25Z"
        fill="var(--icon-strong-base)"
      />
    </svg>
  )
}
