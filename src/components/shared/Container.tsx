import { cn } from "@/src/lib/utils";

type ContainerTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "aside";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  /** Element to render, so the markup keeps its meaning. Defaults to `div`. */
  as?: ContainerTag;
};

/**
 * The site's content column: the shared `.container` width with the standard
 * side padding (16px, 24px from `sm`, 32px from `lg`). Anything else goes in
 * `className`, which is merged last — so it can also override the padding.
 *
 * @example
 * <Container className="relative text-center">…</Container>
 * <Container as="section" className="py-8 lg:py-16">…</Container>
 */
const Container = ({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) => (
  <Tag className={cn("container px-4 sm:px-6 lg:px-8", className)} {...props} />
);

export default Container;
