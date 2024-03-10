import { css } from 'styled-components'

const breakpoints = {
  sp: '400px',
  tb: '600px',
}

const breakpoint = {
  sp: (...args: TemplateStringsArray[]) => css`
    @media (max-width: ${breakpoints.sp}) {
      ${css(...args as [any])};
    }
  `,
  tb: (...args: TemplateStringsArray[]) => css`
    @media (max-width: ${breakpoints.tb}) {
      ${css(...args as [any])};
    }
  `,
}
export default breakpoint;