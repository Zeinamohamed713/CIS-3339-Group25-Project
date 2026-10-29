<template>
  <main class="overflow-hidden bg-slate-50 text-slate-900">

    <!-- ====================================================== -->
    <!-- HERO -->
    <!-- ====================================================== -->

    <section
      class="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <!-- Decorative background -->
      <div
        class="absolute -left-32 top-24 h-96 w-96 rounded-full bg-red-200/30 blur-3xl"
      ></div>

      <div
        class="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl"
      ></div>

      <div
        class="absolute right-[20%] top-[18%] h-40 w-40 rounded-full bg-blue-100/50 blur-2xl"
      ></div>

      <div
        class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2"
      >
        <!-- Hero Copy -->
        <div>
          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-700 shadow-sm"
          >
            <span
              class="h-2 w-2 rounded-full bg-red-600"
            ></span>

            Community Center
          </div>

          <h1
            class="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.05em] text-slate-950 sm:text-6xl md:text-7xl xl:text-8xl"
          >
            CONNECTING
            <span class="text-red-700">
              PEOPLE
            </span>

            WITH RESOURCES
            THAT MATTER.
          </h1>

          <p
            class="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            Discover community events, helpful services, and local resources
            through one connected platform built around people.
          </p>

          <div
            class="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#about"
              class="inline-flex items-center justify-center rounded-2xl bg-red-700 px-6 py-4 text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:-translate-y-0.5 hover:bg-red-600"
            >
              Explore Community
              <span class="ml-2">
                →
              </span>
            </a>

            <router-link
              to="/login"
              class="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
            >
              Member Login
            </router-link>
          </div>

          <!-- Hero Stats -->
          <div
            class="mt-12 grid max-w-2xl grid-cols-3 gap-5 border-t border-slate-200 pt-7"
          >
            <div>
              <p
                class="text-2xl font-black text-slate-950 md:text-3xl"
              >
                Events
              </p>

              <p
                class="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Stay Connected
              </p>
            </div>

            <div>
              <p
                class="text-2xl font-black text-slate-950 md:text-3xl"
              >
                Services
              </p>

              <p
                class="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Find Support
              </p>
            </div>

            <div>
              <p
                class="text-2xl font-black text-slate-950 md:text-3xl"
              >
                Community
              </p>

              <p
                class="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Grow Together
              </p>
            </div>
          </div>
        </div>


        <!-- Hero Visual -->
        <div
          class="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div
            class="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-3 shadow-2xl shadow-slate-900/20"
          >
            <div
              class="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-700 via-red-600 to-orange-500"
            >
              <!-- Shapes -->
              <div
                class="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/10"
              ></div>

              <div
                class="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white/10"
              ></div>

              <div
                class="absolute left-12 top-16 h-32 w-32 rounded-3xl bg-white/10 rotate-12"
              ></div>

              <!-- Main visual content -->
              <div
                class="relative z-10 flex min-h-[560px] flex-col justify-between p-8 md:p-10"
              >
                <div class="flex justify-between">
                  <div
                    class="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur"
                  >
                    Community First
                  </div>

                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-black text-red-700"
                  >
                    C
                  </div>
                </div>

                <div>
                  <p
                    class="text-sm font-black uppercase tracking-[0.25em] text-red-100"
                  >
                    One Platform
                  </p>

                  <p
                    class="mt-4 max-w-md text-4xl font-black leading-tight text-white md:text-5xl"
                  >
                    Events.
                    Services.
                    Resources.
                    Together.
                  </p>
                </div>

                <!-- Floating Cards -->
                <div
                  class="grid grid-cols-2 gap-3"
                >
                  <div
                    class="rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md"
                  >
                    <p
                      class="text-xs font-bold uppercase tracking-wider text-red-100"
                    >
                      Discover
                    </p>

                    <p class="mt-2 font-black">
                      Local Events
                    </p>
                  </div>

                  <div
                    class="rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md"
                  >
                    <p
                      class="text-xs font-bold uppercase tracking-wider text-red-100"
                    >
                      Explore
                    </p>

                    <p class="mt-2 font-black">
                      Community Services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- floating badge -->
          <div
            class="absolute -bottom-6 -left-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl md:-left-10"
          >
            <p
              class="text-xs font-black uppercase tracking-[0.2em] text-slate-400"
            >
              Our Focus
            </p>

            <p
              class="mt-1 text-lg font-black text-slate-900"
            >
              Stronger Communities
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- ABOUT -->
    <!-- ====================================================== -->

    <section
      id="about"
      class="scroll-mt-28 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        class="mx-auto max-w-7xl"
      >
        <div
          class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2"
        >
          <!-- Large Statement -->
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.25em] text-red-700"
            >
              About Our Community
            </p>

            <h2
              class="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 md:text-6xl xl:text-7xl"
            >
              ONE
              <span class="text-red-700">
                COMMUNITY.
              </span>

              MORE CONNECTION.
              MORE SUPPORT.
            </h2>
          </div>

          <!-- Copy -->
          <div>
            <p
              class="text-xl font-semibold leading-relaxed text-slate-700"
            >
              Community Center brings people, programs, events, and resources
              together in one accessible place.
            </p>

            <p
              class="mt-6 text-base leading-relaxed text-slate-500"
            >
              Whether you're looking for a local event, trying to find support,
              or exploring services available in your area, the platform makes
              it easier to discover what your community has to offer.
            </p>

            <div
              class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div
                class="rounded-2xl bg-red-50 p-5"
              >
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-white"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"
                    />
                  </svg>
                </div>

                <p
                  class="mt-4 font-black text-slate-900"
                >
                  Community Events
                </p>

                <p
                  class="mt-2 text-sm leading-relaxed text-slate-500"
                >
                  Find upcoming activities and opportunities to participate.
                </p>
              </div>

              <div
                class="rounded-2xl bg-blue-50 p-5"
              >
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 7h16M4 12h16M4 17h10"
                    />
                  </svg>
                </div>

                <p
                  class="mt-4 font-black text-slate-900"
                >
                  Local Services
                </p>

                <p
                  class="mt-2 text-sm leading-relaxed text-slate-500"
                >
                  Explore programs and resources available to the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- SERVICES -->
    <!-- ====================================================== -->

    <section
      id="services"
      class="scroll-mt-28 bg-slate-100 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        class="mx-auto max-w-7xl"
      >
        <div
          class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.25em] text-blue-600"
            >
              Community Resources
            </p>

            <h2
              class="mt-4 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-6xl"
            >
              SUPPORT FOR EVERY
              PART OF COMMUNITY LIFE.
            </h2>
          </div>

          <p
            class="max-w-md text-base leading-relaxed text-slate-500"
          >
            Explore different types of support designed to help individuals and
            families connect with the resources they need.
          </p>
        </div>


        <!-- Service Grid -->
        <div
          class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          <!-- Health -->
          <article
            class="group relative min-h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-700 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10"
            ></div>

            <div
              class="relative flex h-full flex-col justify-between"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black backdrop-blur"
              >
                +
              </span>

              <div>
                <p
                  class="text-xs font-black uppercase tracking-[0.2em] text-emerald-100"
                >
                  Wellness
                </p>

                <h3
                  class="mt-3 text-3xl font-black leading-tight"
                >
                  Health &
                  Wellness
                </h3>

                <p
                  class="mt-4 text-sm leading-relaxed text-emerald-50"
                >
                  Connect with programs supporting healthier individuals,
                  families, and neighborhoods.
                </p>
              </div>
            </div>
          </article>


          <!-- Career -->
          <article
            class="group relative min-h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-700 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="absolute -bottom-16 -right-10 h-52 w-52 rotate-12 rounded-[3rem] bg-white/10"
            ></div>

            <div
              class="relative flex h-full flex-col justify-between"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black backdrop-blur"
              >
                ↗
              </span>

              <div>
                <p
                  class="text-xs font-black uppercase tracking-[0.2em] text-blue-100"
                >
                  Opportunity
                </p>

                <h3
                  class="mt-3 text-3xl font-black leading-tight"
                >
                  Career
                  Development
                </h3>

                <p
                  class="mt-4 text-sm leading-relaxed text-blue-50"
                >
                  Discover employment resources, job-readiness programs, and
                  opportunities to build new skills.
                </p>
              </div>
            </div>
          </article>


          <!-- Family -->
          <article
            class="group relative min-h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-500 to-violet-700 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="absolute -left-16 top-10 h-52 w-52 rounded-full border-[30px] border-white/10"
            ></div>

            <div
              class="relative flex h-full flex-col justify-between"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black backdrop-blur"
              >
                ♥
              </span>

              <div>
                <p
                  class="text-xs font-black uppercase tracking-[0.2em] text-purple-100"
                >
                  Family
                </p>

                <h3
                  class="mt-3 text-3xl font-black leading-tight"
                >
                  Family
                  Services
                </h3>

                <p
                  class="mt-4 text-sm leading-relaxed text-purple-50"
                >
                  Find programs and support designed for children, parents, and
                  families.
                </p>
              </div>
            </div>
          </article>


          <!-- Housing -->
          <article
            class="group relative min-h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 to-red-600 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="absolute -right-16 top-20 h-56 w-56 rounded-full bg-white/10"
            ></div>

            <div
              class="relative flex h-full flex-col justify-between"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-black backdrop-blur"
              >
                ⌂
              </span>

              <div>
                <p
                  class="text-xs font-black uppercase tracking-[0.2em] text-orange-100"
                >
                  Stability
                </p>

                <h3
                  class="mt-3 text-3xl font-black leading-tight"
                >
                  Housing
                  Resources
                </h3>

                <p
                  class="mt-4 text-sm leading-relaxed text-orange-50"
                >
                  Connect with information and community programs supporting
                  housing needs.
                </p>
              </div>
            </div>
          </article>
        </div>

        <div
          class="mt-8 text-center"
        >
          <router-link
            to="/login"
            class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            Sign in to Explore Services
            <span class="ml-2">
              →
            </span>
          </router-link>
        </div>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- WHY COMMUNITY CENTER -->
    <!-- ====================================================== -->

    <section
      class="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        class="mx-auto max-w-7xl"
      >
        <div
          class="grid grid-cols-1 gap-14 lg:grid-cols-12"
        >
          <!-- Heading -->
          <div
            class="lg:col-span-5"
          >
            <p
              class="text-xs font-black uppercase tracking-[0.25em] text-red-700"
            >
              Why Community Center
            </p>

            <h2
              class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-6xl"
            >
              BUILT TO MAKE
              COMMUNITY
              CONNECTION
              EASIER.
            </h2>

            <p
              class="mt-6 max-w-lg text-base leading-relaxed text-slate-500"
            >
              The platform focuses on making information easier to discover,
              understand, and use.
            </p>
          </div>


          <!-- Reasons -->
          <div
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7"
          >
            <div
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 font-black text-red-700"
              >
                01
              </div>

              <h3
                class="mt-5 text-lg font-black text-slate-900"
              >
                Easy Access
              </h3>

              <p
                class="mt-2 text-sm leading-relaxed text-slate-500"
              >
                Find events and community resources from one central place.
              </p>
            </div>


            <div
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-600"
              >
                02
              </div>

              <h3
                class="mt-5 text-lg font-black text-slate-900"
              >
                Community Focused
              </h3>

              <p
                class="mt-2 text-sm leading-relaxed text-slate-500"
              >
                Information organized around programs and activities that serve
                local communities.
              </p>
            </div>


            <div
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 font-black text-emerald-600"
              >
                03
              </div>

              <h3
                class="mt-5 text-lg font-black text-slate-900"
              >
                Stay Connected
              </h3>

              <p
                class="mt-2 text-sm leading-relaxed text-slate-500"
              >
                Keep up with upcoming events and recent community participation.
              </p>
            </div>


            <div
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 font-black text-purple-600"
              >
                04
              </div>

              <h3
                class="mt-5 text-lg font-black text-slate-900"
              >
                Resource Discovery
              </h3>

              <p
                class="mt-2 text-sm leading-relaxed text-slate-500"
              >
                Explore services designed to support a variety of community
                needs.
              </p>
            </div>


            <div
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 font-black text-orange-600"
              >
                05
              </div>

              <h3
                class="mt-5 text-lg font-black text-slate-900"
              >
                Simple Experience
              </h3>

              <p
                class="mt-2 text-sm leading-relaxed text-slate-500"
              >
                Clean navigation keeps important information easy to find.
              </p>
            </div>


            <div
              class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 font-black text-cyan-600"
              >
                06
              </div>

              <h3
                class="mt-5 text-lg font-black text-slate-900"
              >
                Growing Reach
              </h3>

              <p
                class="mt-2 text-sm leading-relaxed text-slate-500"
              >
                Support visibility across programs, events, and community areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- EVENTS -->
    <!-- ====================================================== -->

    <section
      id="events"
      class="scroll-mt-28 bg-gradient-to-br from-orange-50 via-red-50 to-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        class="mx-auto max-w-7xl"
      >
        <div
          class="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center"
        >
          <!-- Visual -->
          <div
            class="relative"
          >
            <div
              class="relative min-h-[540px] overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white md:p-10"
            >
              <div
                class="absolute -right-28 -top-24 h-80 w-80 rounded-full bg-red-600/40 blur-xl"
              ></div>

              <div
                class="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-orange-500/30 blur-xl"
              ></div>

              <div
                class="relative z-10 flex h-full min-h-[460px] flex-col justify-between"
              >
                <div>
                  <span
                    class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]"
                  >
                    Community In Action
                  </span>
                </div>

                <div>
                  <p
                    class="max-w-lg text-4xl font-black leading-tight md:text-5xl"
                  >
                    SHARE EXPERIENCES.
                    BUILD CONNECTIONS.
                  </p>

                  <p
                    class="mt-5 max-w-md text-base leading-relaxed text-slate-300"
                  >
                    Community events create opportunities for people to learn,
                    connect, and participate together.
                  </p>
                </div>

                <div
                  class="grid grid-cols-3 gap-3"
                >
                  <div
                    class="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <p
                      class="text-xs font-black uppercase text-slate-400"
                    >
                      Learn
                    </p>
                  </div>

                  <div
                    class="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <p
                      class="text-xs font-black uppercase text-slate-400"
                    >
                      Connect
                    </p>
                  </div>

                  <div
                    class="rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <p
                      class="text-xs font-black uppercase text-slate-400"
                    >
                      Participate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- Event Copy -->
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.25em] text-red-700"
            >
              Community Events
            </p>

            <h2
              class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-6xl"
            >
              THERE'S ALWAYS
              SOMETHING
              HAPPENING.
            </h2>

            <p
              class="mt-7 max-w-xl text-lg leading-relaxed text-slate-600"
            >
              From information sessions and workshops to family activities and
              resource events, Community Center helps you discover opportunities
              to get involved.
            </p>

            <div
              class="mt-9 space-y-4"
            >
              <div
                class="flex items-center gap-4 rounded-2xl border border-red-100 bg-white p-4 shadow-sm"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"
                    />
                  </svg>
                </div>

                <div>
                  <p
                    class="font-black text-slate-900"
                  >
                    Upcoming Activities
                  </p>

                  <p
                    class="mt-1 text-sm text-slate-500"
                  >
                    Discover what's happening next.
                  </p>
                </div>
              </div>

              <div
                class="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm"
              >
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
                >
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <div>
                  <p
                    class="font-black text-slate-900"
                  >
                    Event Details
                  </p>

                  <p
                    class="mt-1 text-sm text-slate-500"
                  >
                    View dates, participation, and event information.
                  </p>
                </div>
              </div>
            </div>

            <router-link
              to="/login"
              class="mt-8 inline-flex items-center rounded-2xl bg-red-700 px-6 py-4 text-sm font-black text-white shadow-lg shadow-red-700/20 transition hover:-translate-y-0.5 hover:bg-red-600"
            >
              Sign in to View Events
              <span class="ml-2">
                →
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- IMPACT -->
    <!-- ====================================================== -->

    <section
      class="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        class="mx-auto max-w-7xl"
      >
        <div
          class="overflow-hidden rounded-[2.5rem] bg-red-700 px-6 py-16 text-white md:px-12 lg:px-16 lg:py-20"
        >
          <div
            class="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <p
                class="text-xs font-black uppercase tracking-[0.25em] text-red-100"
              >
                Community Impact
              </p>

              <h2
                class="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl"
              >
                CONNECTION
                CREATES
                OPPORTUNITY.
              </h2>

              <p
                class="mt-6 max-w-lg text-base leading-relaxed text-red-100"
              >
                Every event, service, and community resource represents another
                opportunity to help people discover support and stay connected.
              </p>
            </div>

            <div
              class="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <div
                class="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
              >
                <p
                  class="text-4xl font-black"
                >
                  One
                </p>

                <p
                  class="mt-3 text-xs font-black uppercase tracking-wider text-red-100"
                >
                  Connected Platform
                </p>
              </div>

              <div
                class="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
              >
                <p
                  class="text-4xl font-black"
                >
                  Many
                </p>

                <p
                  class="mt-3 text-xs font-black uppercase tracking-wider text-red-100"
                >
                  Community Resources
                </p>
              </div>

              <div
                class="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur"
              >
                <p
                  class="text-4xl font-black"
                >
                  More
                </p>

                <p
                  class="mt-3 text-xs font-black uppercase tracking-wider text-red-100"
                >
                  Ways To Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- CTA -->
    <!-- ====================================================== -->

    <section
      class="bg-slate-100 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        class="mx-auto max-w-5xl text-center"
      >
        <p
          class="text-xs font-black uppercase tracking-[0.25em] text-red-700"
        >
          Get Connected
        </p>

        <h2
          class="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-slate-950 md:text-7xl"
        >
          READY TO EXPLORE
          YOUR COMMUNITY?
        </h2>

        <p
          class="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500"
        >
          Sign in to view community events, explore available services, and
          access your personalized dashboard.
        </p>

        <router-link
          to="/login"
          class="mt-9 inline-flex items-center rounded-2xl bg-red-700 px-8 py-4 text-sm font-black text-white shadow-xl shadow-red-700/20 transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          Member Login
          <span class="ml-2">
            →
          </span>
        </router-link>
      </div>
    </section>


    <!-- ====================================================== -->
    <!-- FOOTER -->
    <!-- ====================================================== -->

    <footer
      class="bg-slate-950 px-4 pb-10 pt-16 text-white sm:px-6 lg:px-8"
    >
      <div
        class="mx-auto max-w-7xl"
      >
        <div
          class="grid grid-cols-1 gap-12 border-b border-slate-800 pb-12 md:grid-cols-2 lg:grid-cols-4"
        >
          <!-- Brand -->
          <div
            class="lg:col-span-2"
          >
            <div
              class="flex items-center gap-3"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-full bg-red-700 text-lg font-black"
              >
                C
              </div>

              <div>
                <p
                  class="text-xl font-black"
                >
                  Community Center
                </p>

                <p
                  class="text-xs uppercase tracking-[0.2em] text-slate-500"
                >
                  Data Platform
                </p>
              </div>
            </div>

            <p
              class="mt-6 max-w-md text-sm leading-relaxed text-slate-400"
            >
              Helping people discover events, services, and resources that
              strengthen community connections.
            </p>
          </div>


          <!-- Explore -->
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.2em] text-slate-500"
            >
              Explore
            </p>

            <div
              class="mt-5 space-y-3"
            >
              <a
                href="#about"
                class="block text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                About
              </a>

              <a
                href="#services"
                class="block text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Services
              </a>

              <a
                href="#events"
                class="block text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Events
              </a>
            </div>
          </div>


          <!-- Account -->
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.2em] text-slate-500"
            >
              Account
            </p>

            <div
              class="mt-5 space-y-3"
            >
              <router-link
                to="/login"
                class="block text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                Member Login
              </router-link>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col gap-3 pt-8 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            Community Center Data Platform
          </p>

          <p>
            CIS 3339 Enterprise Applications Development
          </p>
        </div>
      </div>
    </footer>
  </main>
</template>


<script setup>
// Public landing page.
// No protected API calls are made here.
//
// Events and services remain behind authentication.
// The landing page introduces those features without
// exposing protected organization data.
</script>