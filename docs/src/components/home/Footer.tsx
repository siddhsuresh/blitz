import Link from "next/link"
import clsx from "clsx"
import {Icon} from "./Icon"
import {LinkList} from "./LinkList"
import {NewsletterForm} from "./NewsletterForm"

export function Footer({className, hasDarkMode}) {
  return (
    <footer className={className}>
      <div className="border-t border-gray-300 dark:border-white border-opacity-50">
        <div className="relative mx-auto max-w-7xl">
          <a href="#top" className="absolute right-0 mr-2 -mt-5 xl:mt-24 xl:mr-6">
            <Icon
              name="arrowUp"
              className="icon-expanded"
              variant="custom"
              customBackgroundClassName="text-purple-light dark:text-off-white"
              customColorClassName="text-off-white dark:text-purple-off-black"
            ></Icon>
          </a>
        </div>
        <div className="grid px-6 mx-auto max-w-7xl lg:grid-cols-3 gap-x-24 my-14 lg:mt-24 lg:mb-12 gap-y-7">
          <div className="flex flex-col justify-between space-y-7">
            <p className="text-lg font-semibold">
              Want to receive the latest news and updates from the Blitz team? Sign up for our
              newsletter!
            </p>
            <div className="pb-5 lg:pb-0">
              <NewsletterForm hasDarkMode={hasDarkMode} className=""/>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-7 lg:col-span-2">
            <div className="grid gap-7 md:grid-cols-3">
              <LinkList title="Docs">
                <Link legacyBehavior href="/docs">
                  <a>All Docs</a>
                </Link>
                <Link legacyBehavior href="/docs/get-started">
                  <a>Get Started</a>
                </Link>
                <Link legacyBehavior href="/docs/contributing">
                  <a>How To Contribute</a>
                </Link>
              </LinkList>

              <LinkList title="Community">
                <Link legacyBehavior href="https://discord.blitzjs.com/">
                  <a target="_blank" rel="noopener noreferrer">
                    Discord
                  </a>
                </Link>
                <Link legacyBehavior href="https://github.com/blitz-js/blitz/discussions">
                  <a target="_blank" rel="noopener noreferrer">
                    Forum Discussions
                  </a>
                </Link>
                <Link legacyBehavior href="https://twitter.com/blitz_js">
                  <a target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </Link>
                <Link legacyBehavior href="/showcase">
                  <a>Showcase</a>
                </Link>
              </LinkList>

              <LinkList title="Other">
                <Link legacyBehavior href="https://flightcontrol.dev?ref=blitzjs">
                  <a target="_blank" rel="noopener noreferrer">
                    Deploy with Flightcontrol
                  </a>
                </Link>
                <Link legacyBehavior href="https://github.com/blitz-js/blitz">
                  <a target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Link>
                <Link legacyBehavior href="https://github.com/blitz-js/blitz/wiki">
                  <a target="_blank" rel="noopener noreferrer">
                    Wiki
                  </a>
                </Link>
                <Link legacyBehavior href="https://store.blitzjs.com">
                  <a target="_blank" rel="noopener noreferrer">
                    Swag
                  </a>
                </Link>
              </LinkList>
            </div>
         
            <div
              className={clsx("text-xs font-secondary", {
                "text-off-white": !hasDarkMode,
                "dark:text-off-white text-black": hasDarkMode,
              })}
            >
              {/* <Link legacyBehavior href="https://vercel.com/?utm_source=blitzjs">
                <a target="_blank" rel="noopener noreferrer">
                  Hosted on <IoLogoVercel className="inline" /> Vercel
                </a>
              </Link>
              <br /> */}
              Copyright &copy; {new Date().getFullYear()} Brandon Bayer and Blitz.js Contributors
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
