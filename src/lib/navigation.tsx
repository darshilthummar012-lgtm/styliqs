'use client'

import NextLink from 'next/link'
import {
  usePathname,
  useRouter,
  useParams as useNextParams,
  useSearchParams as useNextSearchParams,
} from 'next/navigation'
import {
  forwardRef,
  type ComponentProps,
  type ReactNode,
} from 'react'

export { usePathname, useRouter }

type BaseLinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to?: string
  href?: string
}

/** Drop-in Link: supports legacy `to` and Next `href`. */
export const Link = forwardRef<HTMLAnchorElement, BaseLinkProps>(
  function Link({ to, href, ...rest }, ref) {
    return <NextLink ref={ref} href={href ?? to ?? '/'} {...rest} />
  },
)

export function useNavigate() {
  const router = useRouter()
  return (to: string) => {
    router.push(to)
  }
}

export function useLocation() {
  const pathname = usePathname() ?? '/'
  const searchParams = useNextSearchParams()
  const search = searchParams?.toString() ?? ''
  return {
    pathname,
    search: search ? `?${search}` : '',
  }
}

export function useSearchParams() {
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const searchParams = useNextSearchParams() ?? new URLSearchParams()

  const setSearchParams = (
    next: URLSearchParams,
    opts?: { replace?: boolean },
  ) => {
    const qs = next.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    if (opts?.replace) router.replace(url)
    else router.push(url)
  }

  return [searchParams, setSearchParams] as const
}

export function useParams<
  T extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
>() {
  const params = useNextParams()
  return (params ?? {}) as T
}

type NavLinkClassFn = (args: { isActive: boolean }) => string
type NavLinkChildrenFn = (args: { isActive: boolean }) => ReactNode

export function NavLink({
  to,
  href,
  className,
  children,
  onFocus,
  ...rest
}: {
  to?: string
  href?: string
  className?: string | NavLinkClassFn
  children?: ReactNode | NavLinkChildrenFn
  onFocus?: ComponentProps<typeof NextLink>['onFocus']
} & Omit<ComponentProps<typeof NextLink>, 'href' | 'className' | 'children'>) {
  const pathname = usePathname() ?? '/'
  const target = href ?? to ?? '/'
  const pathOnly = target.split('?')[0]
  const isActive =
    pathname === pathOnly || (pathOnly !== '/' && pathname.startsWith(pathOnly))

  const cls =
    typeof className === 'function' ? className({ isActive }) : className
  const content =
    typeof children === 'function' ? children({ isActive }) : children

  return (
    <NextLink href={target} className={cls} onFocus={onFocus} {...rest}>
      {content}
    </NextLink>
  )
}
