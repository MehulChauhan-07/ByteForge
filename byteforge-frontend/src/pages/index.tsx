import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          {/* <span className={title()}>Master&nbsp;</span> */}
          {/* <span className={title({ color: "violet" })}>Java&nbsp;</span> */}
          <br />
          {/* <span className={title()}> */}
          <span className={title({ class: "lg:text-[2.5rem]" })}>
            Master Java Programming with <br />
          </span>
          <span className={title({ color: "violet" })}>ByteForge&nbsp;</span>

          <div className={subtitle({ class: "mt-4" })}>
            An user-friendly learning platform designed to help you become a
            Java expert through interactive lessons, real-time coding, and AI
            assistance.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Start learning
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            {/* <GithubIcon size={20} /> */}
            Explore features
          </Link>
        </div>

        {/* <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div> */}
      </section>
    </DefaultLayout>
  );
}
