<!-- Dashboard / Home View -->

<template>
  <main class="min-h-screen bg-slate-100">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">

      <!-- ====================================================== -->
      <!-- VIEWER / COMMUNITY PORTAL -->
      <!-- ====================================================== -->

      <template v-if="!isEditor">

        <!-- ==================================================== -->
        <!-- VIEWER HERO -->
        <!-- ==================================================== -->

        <section
          class="relative mb-6 overflow-hidden rounded-3xl bg-red-700 px-8 py-10 text-white md:px-12 md:py-14"
        >
          <div class="relative z-10 max-w-3xl">
            <p
              class="mb-3 text-xs font-black uppercase tracking-[0.25em] text-red-100"
            >
              Community Center
            </p>

            <h1
              class="text-4xl font-black leading-tight tracking-tight md:text-5xl"
            >
              Welcome back<span v-if="userName">, {{ userName }}</span>.
            </h1>

            <p
              class="mt-5 max-w-2xl text-base leading-relaxed text-red-100 md:text-lg"
            >
              Discover upcoming events, explore community services, and stay
              connected with resources available in your area.
            </p>

            <!-- Viewer Actions -->
            <div
              class="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <router-link
                to="/findevents"
                class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-red-700 shadow-sm transition hover:bg-red-50"
              >
                Explore Events
                <span class="ml-2">→</span>
              </router-link>

              <router-link
                to="/findservice"
                class="inline-flex items-center justify-center rounded-xl border border-red-400 bg-red-800/30 px-5 py-3 text-sm font-black text-white transition hover:bg-red-800/50"
              >
                Browse Services
                <span class="ml-2">→</span>
              </router-link>
            </div>
          </div>

          <!-- Decorative background -->
          <div
            class="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white opacity-10"
          ></div>

          <div
            class="absolute -bottom-32 right-28 h-64 w-64 rounded-full bg-white opacity-10"
          ></div>
        </section>


        <!-- ==================================================== -->
        <!-- VIEWER KPI CARDS -->
        <!-- ==================================================== -->

        <section
          class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"
        >

          <!-- Upcoming Events -->
          <router-link
            to="/findevents"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700"
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

              <span
                class="text-xs font-bold text-slate-400 transition group-hover:text-red-700"
              >
                View →
              </span>
            </div>

            <p
              class="mt-5 text-xs font-black uppercase tracking-wider text-slate-400"
            >
              Upcoming Events
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              <span v-if="eventsLoading">—</span>
              <span v-else>{{ upcomingEvents.length }}</span>
            </p>

            <p
              v-if="nextEvent"
              class="mt-2 truncate text-xs text-slate-500"
            >
              Next: {{ nextEvent.name }}
            </p>

            <p
              v-else
              class="mt-2 text-xs text-slate-500"
            >
              No future events scheduled
            </p>
          </router-link>


          <!-- Services -->
          <router-link
            to="/findservice"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
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

              <span
                class="text-xs font-bold text-slate-400 transition group-hover:text-blue-600"
              >
                Explore →
              </span>
            </div>

            <p
              class="mt-5 text-xs font-black uppercase tracking-wider text-slate-400"
            >
              Available Services
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              <span v-if="servicesLoading">—</span>
              <span v-else>{{ services.length }}</span>
            </p>

            <p class="mt-2 text-xs text-slate-500">
              Community resources available to explore
            </p>
          </router-link>


          <!-- Community Reach -->
          <router-link
            to="/findclient"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
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
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.5 4-5.7 4-9s-1.5-6.5-4-9m0 18c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9M3 12h18"
                  />
                </svg>
              </div>

              <span
                class="text-xs font-bold text-slate-400 transition group-hover:text-emerald-600"
              >
                View →
              </span>
            </div>

            <p
              class="mt-5 text-xs font-black uppercase tracking-wider text-slate-400"
            >
              Community Reach
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              {{ zips.length }}
            </p>

            <p class="mt-2 text-xs text-slate-500">
              {{ totalClients }} clients across ZIP-code areas
            </p>
          </router-link>
        </section>


        <!-- ==================================================== -->
        <!-- UPCOMING EVENTS -->
        <!-- ==================================================== -->

        <section
          class="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
          >
            <div>
              <p
                class="text-xs font-black uppercase tracking-[0.18em] text-red-700"
              >
                What's Coming Up
              </p>

              <h2 class="mt-1 text-lg font-black text-slate-900">
                Upcoming Events
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                Discover upcoming activity in your community
              </p>
            </div>

            <router-link
              to="/findevents"
              class="text-xs font-bold text-red-700 hover:text-red-600"
            >
              View All →
            </router-link>
          </div>

          <!-- Loading -->
          <div
            v-if="eventsLoading"
            class="p-12 text-center text-sm font-semibold text-slate-400"
          >
            Loading upcoming events...
          </div>

          <!-- Error -->
          <div
            v-else-if="eventsError"
            class="p-6"
          >
            <div
              class="rounded-xl border border-red-200 bg-red-50 p-5 text-center"
            >
              <p class="font-bold text-red-700">
                {{ eventsError }}
              </p>

              <button
                type="button"
                class="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white"
                @click="retryEvents"
              >
                Retry
              </button>
            </div>
          </div>

          <!-- Empty -->
          <div
            v-else-if="upcomingEvents.length === 0"
            class="p-12 text-center"
          >
            <p class="font-bold text-slate-700">
              No upcoming events
            </p>

            <p class="mt-1 text-sm text-slate-400">
              Check back later for new community events.
            </p>
          </div>

          <!-- Event Cards -->
          <div
            v-else
            class="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-3"
          >
            <button
              v-for="event in upcomingEvents.slice(0, 3)"
              :key="event._id"
              type="button"
              class="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
              @click="editEvent(event._id)"
            >
              <div class="flex items-start gap-4">
                <!-- Date Block -->
                <div
                  class="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-red-50 text-red-700"
                >
                  <span
                    class="text-[10px] font-black uppercase tracking-wide"
                  >
                    {{ eventMonth(event.date) }}
                  </span>

                  <span
                    class="text-xl font-black leading-none"
                  >
                    {{ eventDay(event.date) }}
                  </span>
                </div>

                <div class="min-w-0 flex-1">
                  <p
                    class="truncate text-sm font-black text-slate-900 transition group-hover:text-red-700"
                  >
                    {{ event.name }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    {{ formatDate(event.date) }}
                  </p>

                  <div
                    class="mt-4 flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <span
                        class="rounded-lg bg-slate-100 px-2 py-1 text-xs font-black text-slate-700"
                      >
                        {{ event.attendees?.length || 0 }}
                      </span>

                      <span class="text-xs text-slate-400">
                        registered
                      </span>
                    </div>

                    <span
                      class="text-xs font-bold text-red-700"
                    >
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>


        <!-- ==================================================== -->
        <!-- SERVICES + COMMUNITY SNAPSHOT -->
        <!-- ==================================================== -->

        <section
          class="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-5"
        >

          <!-- Explore Services -->
          <div
            class="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3"
          >
            <div
              class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
            >
              <div>
                <p
                  class="text-xs font-black uppercase tracking-[0.18em] text-blue-600"
                >
                  Community Resources
                </p>

                <h2 class="mt-1 font-black text-slate-900">
                  Explore Services
                </h2>

                <p class="mt-1 text-xs text-slate-500">
                  Find programs and resources available to you
                </p>
              </div>

              <router-link
                to="/findservice"
                class="text-xs font-bold text-blue-600 hover:text-blue-500"
              >
                View All →
              </router-link>
            </div>

            <!-- Loading -->
            <div
              v-if="servicesLoading"
              class="p-12 text-center text-sm text-slate-400"
            >
              Loading services...
            </div>

            <!-- Error -->
            <div
              v-else-if="servicesError"
              class="p-6"
            >
              <div
                class="rounded-xl border border-red-200 bg-red-50 p-5 text-center"
              >
                <p class="font-bold text-red-700">
                  {{ servicesError }}
                </p>

                <button
                  type="button"
                  class="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white"
                  @click="retryServices"
                >
                  Retry
                </button>
              </div>
            </div>

            <!-- Empty -->
            <div
              v-else-if="viewerFeaturedServices.length === 0"
              class="p-12 text-center text-sm text-slate-400"
            >
              No services are currently available.
            </div>

            <!-- Service List -->
            <div
              v-else
              class="divide-y divide-slate-100"
            >
              <button
                v-for="(service, index) in viewerFeaturedServices"
                :key="service._id"
                type="button"
                class="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                @click="editService(service._id)"
              >
                <div class="flex min-w-0 items-center gap-4">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    :class="serviceIconClass(index)"
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

                  <div class="min-w-0">
                    <p
                      class="truncate text-sm font-bold text-slate-800 transition group-hover:text-blue-600"
                    >
                      {{ service.name }}
                    </p>

                    <p
                      class="mt-1 line-clamp-1 text-xs text-slate-500"
                    >
                      {{
                        service.description ||
                        'View service details and community resources.'
                      }}
                    </p>
                  </div>
                </div>

                <span
                  class="shrink-0 text-sm text-slate-300 transition group-hover:text-blue-600"
                >
                  →
                </span>
              </button>
            </div>
          </div>


          <!-- Community Snapshot -->
          <div
            class="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2"
          >
            <div
              class="border-b border-slate-100 px-5 py-4"
            >
              <p
                class="text-xs font-black uppercase tracking-[0.18em] text-emerald-600"
              >
                Community Snapshot
              </p>

              <h2 class="mt-1 font-black text-slate-900">
                People & Areas Reached
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                A snapshot of community participation
              </p>
            </div>

            <!-- ZIP Loading -->
            <div
              v-if="zipLoading"
              class="p-12 text-center text-sm text-slate-400"
            >
              Loading community information...
            </div>

            <!-- ZIP Error -->
            <div
              v-else-if="zipError"
              class="p-6"
            >
              <div
                class="rounded-xl border border-red-200 bg-red-50 p-5 text-center"
              >
                <p class="font-bold text-red-700">
                  {{ zipError }}
                </p>

                <button
                  type="button"
                  class="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white"
                  @click="retryZip"
                >
                  Retry
                </button>
              </div>
            </div>

            <!-- Empty -->
            <div
              v-else-if="zips.length === 0"
              class="p-12 text-center text-sm text-slate-400"
            >
              No community reach data available.
            </div>

            <!-- Snapshot -->
            <div
              v-else
              class="p-5"
            >
              <div
                class="mx-auto flex min-h-[250px] max-w-sm items-center justify-center"
              >
                <ZipChart
                  :label="zipLabels"
                  :chart-data="zipChartData"
                />
              </div>

              <div
                class="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5"
              >
                <div
                  class="rounded-xl bg-slate-50 p-4 text-center"
                >
                  <p
                    class="text-2xl font-black text-slate-900"
                  >
                    {{ totalClients }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    Clients represented
                  </p>
                </div>

                <div
                  class="rounded-xl bg-slate-50 p-4 text-center"
                >
                  <p
                    class="text-2xl font-black text-slate-900"
                  >
                    {{ zips.length }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    ZIP-code areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <!-- ==================================================== -->
        <!-- COMMUNITY ACTIVITY -->
        <!-- ==================================================== -->

        <section
          class="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
          >
            <div>
              <p
                class="text-xs font-black uppercase tracking-[0.18em] text-red-700"
              >
                Stay Connected
              </p>

              <h2 class="mt-1 font-black text-slate-900">
                Recent Community Activity
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                Recent event participation across the community
              </p>
            </div>

            <router-link
              to="/findevents"
              class="text-xs font-bold text-red-700 hover:text-red-600"
            >
              View Events →
            </router-link>
          </div>

          <div
            v-if="attendanceLoading"
            class="p-12 text-center text-sm text-slate-400"
          >
            Loading community activity...
          </div>

          <div
            v-else-if="viewerCommunityActivity.length === 0"
            class="p-12 text-center text-sm text-slate-400"
          >
            No recent community activity available.
          </div>

          <div
            v-else
            class="px-6 py-5"
          >
            <div
              v-for="(event, index) in viewerCommunityActivity"
              :key="event._id"
              class="relative flex gap-4 pb-6 last:pb-0"
            >
              <!-- Timeline -->
              <div
                v-if="index !== viewerCommunityActivity.length - 1"
                class="absolute left-[7px] top-5 h-full border-l border-dashed border-slate-300"
              ></div>

              <!-- Dot -->
              <div
                class="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                :class="activityDotClass(index)"
              >
                <div
                  class="h-2 w-2 rounded-full bg-current"
                ></div>
              </div>

              <!-- Activity -->
              <button
                type="button"
                class="group flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
                @click="editEvent(event._id)"
              >
                <div class="min-w-0">
                  <p
                    class="text-sm font-bold text-slate-800 transition group-hover:text-red-700"
                  >
                    {{ event.name }}
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    {{ formatDate(event.date) }}
                  </p>

                  <p class="mt-2 text-xs text-slate-500">
                    <span
                      class="font-black text-red-700"
                    >
                      {{ event.attendees?.length || 0 }}
                    </span>

                    {{
                      (event.attendees?.length || 0) === 1
                        ? ' person participated'
                        : ' people participated'
                    }}
                  </p>
                </div>

                <p
                  class="shrink-0 text-xs font-medium text-slate-400"
                >
                  {{ relativeEventTime(event.date) }}
                </p>
              </button>
            </div>
          </div>
        </section>
      </template>


      <!-- ====================================================== -->
      <!-- ADMIN / EDITOR DASHBOARD -->
      <!-- ====================================================== -->

      <template v-else>

        <!-- Admin Welcome -->
        <section
          class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div class="mb-2 flex items-center gap-3">
              <p
                class="text-xs font-black uppercase tracking-[0.22em] text-red-700"
              >
                Community Operations
              </p>

              <span
                class="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700"
              >
                Editor
              </span>
            </div>

            <h1
              class="text-3xl font-black tracking-tight text-slate-900 md:text-4xl"
            >
              Welcome back<span v-if="userName">, {{ userName }}</span>
            </h1>

            <p class="mt-2 text-sm text-slate-500 md:text-base">
              Here's an overview of your organization's current activity.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <router-link
              to="/findevents"
              class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              View Events
            </router-link>

            <router-link
              to="/findclient"
              class="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              Client Directory
            </router-link>
          </div>
        </section>


        <!-- ==================================================== -->
        <!-- KPI CARDS -->
        <!-- ==================================================== -->

        <section
          class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >

          <!-- Total Clients -->
          <router-link
            to="/findclient"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700"
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
                    d="M17 20h5v-2a4 4 0 0 0-4-4h-1M9 20H2v-2a4 4 0 0 1 4-4h3m6 6v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2m10-12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6 2a3 3 0 1 1-6 0"
                  />
                </svg>
              </div>

              <span
                class="text-xs font-bold text-slate-400 transition group-hover:text-red-700"
              >
                View →
              </span>
            </div>

            <p
              class="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Total Clients
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              <span v-if="zipLoading">—</span>
              <span v-else>{{ totalClients }}</span>
            </p>

            <p class="mt-2 text-xs text-slate-500">
              Across {{ zips.length }} ZIP-code areas
            </p>
          </router-link>


          <!-- Upcoming Events -->
          <router-link
            to="/findevents"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
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

              <span
                class="text-xs font-bold text-slate-400 transition group-hover:text-red-700"
              >
                View →
              </span>
            </div>

            <p
              class="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Upcoming Events
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              <span v-if="eventsLoading">—</span>
              <span v-else>{{ upcomingEvents.length }}</span>
            </p>

            <p
              v-if="nextEvent"
              class="mt-2 truncate text-xs text-slate-500"
            >
              Next: {{ nextEvent.name }}
            </p>

            <p
              v-else
              class="mt-2 text-xs text-slate-500"
            >
              No future events scheduled
            </p>
          </router-link>


          <!-- Services -->
          <router-link
            to="/findservice"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
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

              <span
                class="text-xs font-bold text-slate-400 transition group-hover:text-red-700"
              >
                View →
              </span>
            </div>

            <p
              class="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Services
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              <span v-if="servicesLoading">—</span>
              <span v-else>{{ services.length }}</span>
            </p>

            <p class="mt-2 text-xs text-slate-500">
              Available community services
            </p>
          </router-link>


          <!-- Attendance -->
          <div
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
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
                    d="m4 17 5-5 4 4 7-8M4 20h16"
                  />
                </svg>
              </div>

              <span class="text-xs font-bold text-emerald-600">
                Recent
              </span>
            </div>

            <p
              class="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Attendance
            </p>

            <p class="mt-1 text-3xl font-black text-slate-900">
              <span v-if="attendanceLoading">—</span>
              <span v-else>{{ totalAttendance }}</span>
            </p>

            <p class="mt-2 text-xs text-slate-500">
              Across {{ recentEvents.length }} tracked events
            </p>
          </div>
        </section>


        <!-- ==================================================== -->
        <!-- QUICK ACTIONS + UPCOMING EVENTS -->
        <!-- ==================================================== -->

        <section
          class="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3"
        >

          <!-- Quick Actions -->
          <div
            class="rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div class="border-b border-slate-100 px-5 py-4">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="font-black text-slate-900">
                    Quick Actions
                  </h2>

                  <p class="mt-1 text-xs text-slate-500">
                    Create new records
                  </p>
                </div>

                <span
                  class="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500"
                >
                  Admin
                </span>
              </div>
            </div>

            <div class="space-y-3 p-5">

              <router-link
                to="/clientform"
                class="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-red-200 hover:bg-red-50"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 font-black text-red-700 group-hover:bg-red-700 group-hover:text-white"
                  >
                    +
                  </div>

                  <div>
                    <p class="text-sm font-bold text-slate-800">
                      New Client
                    </p>

                    <p class="text-xs text-slate-500">
                      Add a client record
                    </p>
                  </div>
                </div>

                <span class="text-slate-300">
                  →
                </span>
              </router-link>

              <router-link
                to="/eventform"
                class="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-black text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                  >
                    +
                  </div>

                  <div>
                    <p class="text-sm font-bold text-slate-800">
                      New Event
                    </p>

                    <p class="text-xs text-slate-500">
                      Schedule an event
                    </p>
                  </div>
                </div>

                <span class="text-slate-300">
                  →
                </span>
              </router-link>

              <router-link
                to="/serviceform"
                class="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  >
                    +
                  </div>

                  <div>
                    <p class="text-sm font-bold text-slate-800">
                      New Service
                    </p>

                    <p class="text-xs text-slate-500">
                      Add a new service
                    </p>
                  </div>
                </div>

                <span class="text-slate-300">
                  →
                </span>
              </router-link>
            </div>
          </div>


          <!-- Admin Upcoming Events -->
          <div
            class="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2"
          >
            <div
              class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
            >
              <div>
                <h2 class="font-black text-slate-900">
                  Upcoming Events
                </h2>

                <p class="mt-1 text-xs text-slate-500">
                  Events coming up next
                </p>
              </div>

              <router-link
                to="/findevents"
                class="text-xs font-bold text-red-700 hover:text-red-600"
              >
                View All →
              </router-link>
            </div>

            <div
              v-if="eventsLoading"
              class="p-10 text-center text-sm font-semibold text-slate-400"
            >
              Loading upcoming events...
            </div>

            <div
              v-else-if="eventsError"
              class="p-6"
            >
              <div
                class="rounded-xl border border-red-200 bg-red-50 p-4 text-center"
              >
                <p class="text-sm font-bold text-red-700">
                  {{ eventsError }}
                </p>

                <button
                  type="button"
                  class="mt-3 rounded-lg bg-red-700 px-4 py-2 text-xs font-bold text-white"
                  @click="retryEvents"
                >
                  Retry
                </button>
              </div>
            </div>

            <div
              v-else-if="upcomingEvents.length === 0"
              class="p-10 text-center"
            >
              <p class="font-bold text-slate-700">
                No upcoming events
              </p>

              <p class="mt-1 text-sm text-slate-400">
                Create a new event to add it here.
              </p>

              <router-link
                to="/eventform"
                class="mt-4 inline-flex rounded-xl bg-red-700 px-4 py-2.5 text-sm font-bold text-white"
              >
                + Create Event
              </router-link>
            </div>

            <div
              v-else
              class="divide-y divide-slate-100"
            >
              <button
                v-for="event in upcomingEvents.slice(0, 4)"
                :key="event._id"
                type="button"
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                @click="editEvent(event._id)"
              >
                <div class="flex min-w-0 items-center gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-red-50 text-red-700"
                  >
                    <span class="text-[10px] font-black uppercase">
                      {{ eventMonth(event.date) }}
                    </span>

                    <span class="text-lg font-black leading-none">
                      {{ eventDay(event.date) }}
                    </span>
                  </div>

                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-slate-800">
                      {{ event.name }}
                    </p>

                    <p class="mt-1 text-xs text-slate-500">
                      {{ formatDate(event.date) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="hidden text-right sm:block">
                    <p class="text-sm font-black text-slate-800">
                      {{ event.attendees?.length || 0 }}
                    </p>

                    <p class="text-[11px] text-slate-400">
                      registered
                    </p>
                  </div>

                  <span class="text-slate-300">
                    →
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>


        <!-- ==================================================== -->
        <!-- ATTENDANCE ANALYTICS -->
        <!-- ==================================================== -->

        <section
          class="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div
            class="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p
                class="text-xs font-black uppercase tracking-[0.18em] text-red-700"
              >
                Analytics
              </p>

              <h2 class="mt-1 text-lg font-black text-slate-900">
                Attendance Overview
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                {{
                  attendanceView === 'month'
                    ? 'Event attendance for the current month'
                    : 'Registration activity for upcoming events'
                }}
              </p>
            </div>

            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <!-- Toggle -->
              <div
                class="inline-flex rounded-xl bg-slate-100 p-1"
              >
                <button
                  type="button"
                  class="rounded-lg px-4 py-2 text-xs font-bold transition"
                  :class="
                    attendanceView === 'month'
                      ? 'bg-white text-red-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  "
                  @click="attendanceView = 'month'"
                >
                  This Month
                </button>

                <button
                  type="button"
                  class="rounded-lg px-4 py-2 text-xs font-bold transition"
                  :class="
                    attendanceView === 'upcoming'
                      ? 'bg-white text-red-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  "
                  @click="attendanceView = 'upcoming'"
                >
                  Upcoming
                </button>
              </div>

              <router-link
                to="/findevents"
                class="text-xs font-bold text-red-700 hover:text-red-600"
              >
                Event Directory →
              </router-link>
            </div>
          </div>

          <div
            v-if="attendanceLoading"
            class="py-20 text-center text-sm font-semibold text-slate-400"
          >
            Loading attendance analytics...
          </div>

          <div
            v-else-if="attendanceError"
            class="p-6"
          >
            <div
              class="rounded-xl border border-red-200 bg-red-50 p-5 text-center"
            >
              <p class="font-bold text-red-700">
                {{ attendanceError }}
              </p>

              <button
                type="button"
                class="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white"
                @click="retryAttendance"
              >
                Retry
              </button>
            </div>
          </div>

          <div
            v-else-if="attendanceDisplayEvents.length === 0"
            class="py-16 text-center"
          >
            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400"
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

            <p class="mt-4 font-bold text-slate-700">
              {{
                attendanceView === 'month'
                  ? 'No events this month'
                  : 'No upcoming events'
              }}
            </p>

            <p class="mt-1 text-sm text-slate-400">
              {{
                attendanceView === 'month'
                  ? 'There are no events available for the current month.'
                  : 'There are no future events currently scheduled.'
              }}
            </p>
          </div>

          <div
            v-else
            class="p-5 md:p-6"
          >
            <div
              class="mb-5 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p
                  class="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  {{
                    attendanceView === 'month'
                      ? 'Current Month'
                      : 'Next Events'
                  }}
                </p>

                <p class="mt-1 text-sm font-semibold text-slate-700">
                  {{ attendanceDisplayEvents.length }}
                  event{{
                    attendanceDisplayEvents.length === 1
                      ? ''
                      : 's'
                  }}
                  shown
                </p>
              </div>

              <div
                class="rounded-xl bg-red-50 px-4 py-2 text-right"
              >
                <p
                  class="text-[10px] font-black uppercase tracking-wider text-red-500"
                >
                  {{
                    attendanceView === 'month'
                      ? 'Attendance'
                      : 'Registered'
                  }}
                </p>

                <p class="text-xl font-black text-red-700">
                  {{ attendanceDisplayTotal }}
                </p>
              </div>
            </div>

            <div class="min-h-[340px]">
              <AttendanceChart
                :label="adminAttendanceLabels"
                :chart-data="adminAttendanceData"
              />
            </div>

            <p
              v-if="attendanceDisplayEvents.length >= 6"
              class="mt-3 text-center text-xs text-slate-400"
            >
              Showing up to 6 events. Use the Event Directory to view all events.
            </p>
          </div>
        </section>


        <!-- ==================================================== -->
        <!-- ADMIN BOTTOM GRID -->
        <!-- ==================================================== -->

        <section
          class="grid grid-cols-1 gap-6 xl:grid-cols-5"
        >

          <!-- Recent Event Activity -->
          <div
            class="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3"
          >
            <div
              class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
            >
              <div>
                <h2 class="font-black text-slate-900">
                  Recent Event Activity
                </h2>

                <p class="mt-1 text-xs text-slate-500">
                  Recent and upcoming event activity
                </p>
              </div>

              <router-link
                to="/findevents"
                class="text-xs font-bold text-red-700 hover:text-red-600"
              >
                View All →
              </router-link>
            </div>

            <div
              v-if="attendanceLoading"
              class="p-10 text-center text-sm text-slate-400"
            >
              Loading event activity...
            </div>

            <div
              v-else-if="recentPerformance.length === 0"
              class="p-10 text-center text-sm text-slate-400"
            >
              No recent event activity available.
            </div>

            <div
              v-else
              class="px-6 py-5"
            >
              <div
                v-for="(event, index) in recentPerformance"
                :key="event._id"
                class="relative flex gap-4 pb-6 last:pb-0"
              >
                <div
                  v-if="index !== recentPerformance.length - 1"
                  class="absolute left-[7px] top-5 h-full border-l border-dashed border-slate-300"
                ></div>

                <div
                  class="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  :class="activityDotClass(index)"
                >
                  <div
                    class="h-2 w-2 rounded-full bg-current"
                  ></div>
                </div>

                <button
                  type="button"
                  class="group flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
                  @click="editEvent(event._id)"
                >
                  <div class="min-w-0">
                    <p
                      class="text-sm font-bold text-slate-800 transition group-hover:text-red-700"
                    >
                      {{ event.name }}
                    </p>

                    <p class="mt-1 text-xs text-slate-500">
                      Scheduled for
                      <span class="font-semibold text-slate-700">
                        {{ formatDate(event.date) }}
                      </span>
                    </p>

                    <div class="mt-2 flex items-center gap-2">
                      <span
                        class="rounded-lg bg-red-50 px-2 py-1 text-xs font-black text-red-700"
                      >
                        {{ event.attendees?.length || 0 }}
                      </span>

                      <span class="text-xs text-slate-400">
                        registered
                      </span>
                    </div>
                  </div>

                  <div class="shrink-0 text-right">
                    <p class="text-xs font-medium text-slate-400">
                      {{ relativeEventTime(event.date) }}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>


          <!-- Community Reach -->
          <div
            class="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2"
          >
            <div
              class="border-b border-slate-100 px-5 py-4"
            >
              <h2 class="font-black text-slate-900">
                Community Reach
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                Client distribution by ZIP code
              </p>
            </div>

            <div
              v-if="zipLoading"
              class="p-10 text-center text-sm text-slate-400"
            >
              Loading client distribution...
            </div>

            <div
              v-else-if="zipError"
              class="p-5"
            >
              <div
                class="rounded-xl border border-red-200 bg-red-50 p-4 text-center"
              >
                <p class="text-sm font-bold text-red-700">
                  {{ zipError }}
                </p>

                <button
                  type="button"
                  class="mt-3 rounded-lg bg-red-700 px-4 py-2 text-xs font-bold text-white"
                  @click="retryZip"
                >
                  Retry
                </button>
              </div>
            </div>

            <div
              v-else-if="zips.length === 0"
              class="p-10 text-center text-sm text-slate-400"
            >
              No client distribution data available.
            </div>

            <div
              v-else
              class="p-5"
            >
              <div
                class="mx-auto flex min-h-[280px] max-w-sm items-center justify-center"
              >
                <ZipChart
                  :label="zipLabels"
                  :chart-data="zipChartData"
                />
              </div>

              <div
                class="mt-5 border-t border-slate-100 pt-5"
              >
                <div
                  class="mb-4 flex items-center justify-between"
                >
                  <p
                    class="text-xs font-black uppercase tracking-wider text-slate-400"
                  >
                    Top Areas
                  </p>

                  <p class="text-xs text-slate-400">
                    {{ zips.length }} total
                  </p>
                </div>

                <div
                  class="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-2"
                >
                  <div
                    v-for="(zip, index) in topZips.slice(0, 4)"
                    :key="zip._id"
                    class="rounded-xl bg-slate-50 p-3"
                  >
                    <div class="flex items-center gap-2">
                      <div
                        class="h-2.5 w-2.5 rounded-full"
                        :style="{
                          backgroundColor: zipColor(index)
                        }"
                      ></div>

                      <span
                        class="text-xs font-semibold text-slate-500"
                      >
                        {{ zip._id }}
                      </span>
                    </div>

                    <p class="mt-2 text-lg font-black text-slate-900">
                      {{ zip.count }}
                    </p>

                    <p class="text-[11px] text-slate-400">
                      clients
                    </p>
                  </div>
                </div>

                <router-link
                  to="/findclient"
                  class="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  View Client Directory
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>


<script setup>
import {
  computed,
  ref,
  onMounted
} from 'vue'

import { useRouter } from 'vue-router'

import AttendanceChart from '../components/barChart.vue'
import ZipChart from '../components/donutZipChart.vue'

import {
  getAttendance,
  getClientsByZipCode,
  getEvents,
  getServices
} from '../api/api'

import { useApi } from '../composables/useApi'
import { useLoggedInUserStore } from '../store/loggedInUser'


const router = useRouter()
const userStore = useLoggedInUserStore()

const isEditor = computed(
  () => userStore.role === 'editor'
)

const userName = computed(
  () => userStore.name || ''
)


// ======================================================
// ATTENDANCE API
// ======================================================

const {
  data: attendanceData,
  loading: attendanceLoading,
  error: attendanceError,
  execute: executeAttendance,
  retry: retryAttendanceRequest
} = useApi()


// ======================================================
// ZIP API
// ======================================================

const {
  data: zipData,
  loading: zipLoading,
  error: zipError,
  execute: executeZip,
  retry: retryZipRequest
} = useApi()


// ======================================================
// EVENTS API
// ======================================================

const {
  data: eventsData,
  loading: eventsLoading,
  error: eventsError,
  execute: executeEvents,
  retry: retryEventsRequest
} = useApi()


// ======================================================
// SERVICES API
// ======================================================

const {
  data: servicesData,
  loading: servicesLoading,
  error: servicesError,
  execute: executeServices,
  retry: retryServicesRequest
} = useApi()


// ======================================================
// BASIC DATA
// ======================================================

const recentEvents = computed(
  () => attendanceData.value || []
)

const zips = computed(
  () => zipData.value || []
)

const allEvents = computed(
  () => eventsData.value || []
)

const services = computed(
  () => servicesData.value || []
)


// ======================================================
// KPI CALCULATIONS
// ======================================================

const totalAttendance = computed(() =>
  recentEvents.value.reduce(
    (total, event) =>
      total + (event.attendees?.length || 0),
    0
  )
)

const totalClients = computed(() =>
  zips.value.reduce(
    (total, zip) =>
      total + (zip.count || 0),
    0
  )
)


// ======================================================
// UPCOMING EVENTS
// ======================================================

const upcomingEvents = computed(() => {
  const today = new Date()

  today.setHours(
    0,
    0,
    0,
    0
  )

  return allEvents.value
    .filter((event) => {
      if (!event.date) {
        return false
      }

      const eventDate =
        new Date(event.date)

      return (
        !Number.isNaN(
          eventDate.getTime()
        ) &&
        eventDate >= today
      )
    })
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    )
})

const nextEvent = computed(() =>
  upcomingEvents.value.length > 0
    ? upcomingEvents.value[0]
    : null
)


// ======================================================
// VIEWER SERVICES
// ======================================================

const viewerFeaturedServices = computed(() =>
  services.value.slice(0, 4)
)

function serviceIconClass(index) {
  const colors = [
    'bg-blue-50 text-blue-600',
    'bg-purple-50 text-purple-600',
    'bg-emerald-50 text-emerald-600',
    'bg-orange-50 text-orange-600'
  ]

  return colors[
    index % colors.length
  ]
}


// ======================================================
// VIEWER COMMUNITY ACTIVITY
// ======================================================

const viewerCommunityActivity = computed(() => {
  const today = new Date()

  today.setHours(
    23,
    59,
    59,
    999
  )

  return [...recentEvents.value]
    .filter((event) => {
      if (!event.date) {
        return false
      }

      const eventDate =
        new Date(event.date)

      return (
        !Number.isNaN(
          eventDate.getTime()
        ) &&
        eventDate <= today
      )
    })
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 5)
})


// ======================================================
// ADMIN RECENT PERFORMANCE
// ======================================================

const recentPerformance = computed(() =>
  [...recentEvents.value]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 6)
)


// ======================================================
// TOP ZIP AREAS
// ======================================================

const topZips = computed(() =>
  [...zips.value]
    .sort(
      (a, b) =>
        (b.count || 0) -
        (a.count || 0)
    )
    .slice(0, 5)
)

const zipColors = [
  '#7c3aed',
  '#0ea5e9',
  '#f59e0b',
  '#10b981',
  '#ef4444'
]

function zipColor(index) {
  return zipColors[
    index % zipColors.length
  ]
}


// ======================================================
// ATTENDANCE FILTER
// ======================================================

const attendanceView =
  ref('month')


// ======================================================
// ADMIN ATTENDANCE EVENTS
// ======================================================

const attendanceDisplayEvents = computed(() => {
  const now = new Date()

  const currentYear =
    now.getFullYear()

  const currentMonth =
    now.getMonth()

  const today =
    `${currentYear}-` +
    `${String(currentMonth + 1).padStart(2, '0')}-` +
    `${String(now.getDate()).padStart(2, '0')}`

  if (
    attendanceView.value === 'month'
  ) {
    return [...recentEvents.value]
      .filter((event) => {
        if (!event.date) {
          return false
        }

        const eventDate =
          new Date(event.date)

        if (
          Number.isNaN(
            eventDate.getTime()
          )
        ) {
          return false
        }

        return (
          eventDate.getUTCFullYear() ===
            currentYear &&
          eventDate.getUTCMonth() ===
            currentMonth
        )
      })
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      )
      .slice(0, 6)
  }

  return [...recentEvents.value]
    .filter((event) => {
      if (!event.date) {
        return false
      }

      const eventDate =
        new Date(event.date)
          .toISOString()
          .substring(0, 10)

      return eventDate >= today
    })
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    )
    .slice(0, 6)
})


// ======================================================
// ADMIN ATTENDANCE CHART
// ======================================================

const adminAttendanceLabels = computed(() =>
  attendanceDisplayEvents.value.map(
    (item) =>
      `${item.name} (${formatDate(item.date)})`
  )
)

const adminAttendanceData = computed(() =>
  attendanceDisplayEvents.value.map(
    (item) =>
      item.attendees?.length || 0
  )
)

const attendanceDisplayTotal = computed(() =>
  attendanceDisplayEvents.value.reduce(
    (total, event) =>
      total +
      (event.attendees?.length || 0),
    0
  )
)


// ======================================================
// ZIP CHART DATA
// ======================================================

const zipLabels = computed(() =>
  zips.value.map(
    (item) =>
      item._id
  )
)

const zipChartData = computed(() =>
  zips.value.map(
    (item) =>
      item.count
  )
)


// ======================================================
// DATE HELPERS
// ======================================================

function formatDate(date) {
  const isoDate =
    new Date(date)

  const year =
    isoDate.getUTCFullYear()

  const month =
    String(
      isoDate.getUTCMonth() + 1
    ).padStart(
      2,
      '0'
    )

  const day =
    String(
      isoDate.getUTCDate()
    ).padStart(
      2,
      '0'
    )

  return `${month}/${day}/${year}`
}

function eventMonth(date) {
  return new Date(date)
    .toLocaleString(
      'en-US',
      {
        month: 'short',
        timeZone: 'UTC'
      }
    )
}

function eventDay(date) {
  return new Date(date)
    .toLocaleString(
      'en-US',
      {
        day: '2-digit',
        timeZone: 'UTC'
      }
    )
}


// ======================================================
// ACTIVITY HELPERS
// ======================================================

function activityDotClass(index) {
  const colors = [
    'bg-purple-50 text-purple-600',
    'bg-sky-50 text-sky-500',
    'bg-emerald-50 text-emerald-500',
    'bg-pink-50 text-pink-500',
    'bg-amber-50 text-amber-500',
    'bg-indigo-50 text-indigo-500'
  ]

  return colors[
    index % colors.length
  ]
}

function relativeEventTime(date) {
  const today = new Date()

  today.setHours(
    0,
    0,
    0,
    0
  )

  const eventDate =
    new Date(date)

  if (
    Number.isNaN(
      eventDate.getTime()
    )
  ) {
    return ''
  }

  eventDate.setHours(
    0,
    0,
    0,
    0
  )

  const difference =
    Math.round(
      (eventDate - today) /
      (1000 * 60 * 60 * 24)
    )

  if (difference === 0) {
    return 'Today'
  }

  if (difference === 1) {
    return 'Tomorrow'
  }

  if (difference > 1) {
    return `In ${difference} days`
  }

  if (difference === -1) {
    return 'Yesterday'
  }

  return `${Math.abs(difference)} days ago`
}


// ======================================================
// ROUTING
// ======================================================

function editEvent(id) {
  router.push({
    name: 'eventdetails',

    params: {
      id
    }
  })
}

function editService(id) {
  router.push({
    name: 'servicedetails',

    params: {
      id
    }
  })
}


// ======================================================
// LOAD DATA
// ======================================================

async function loadAttendance() {
  try {
    await executeAttendance(
      getAttendance
    )
  } catch (error) {
    // useApi already stores the error
  }
}

async function loadZipData() {
  try {
    await executeZip(
      getClientsByZipCode
    )
  } catch (error) {
    // useApi already stores the error
  }
}

async function loadEvents() {
  try {
    await executeEvents(
      getEvents
    )
  } catch (error) {
    // useApi already stores the error
  }
}

async function loadServices() {
  try {
    await executeServices(
      getServices
    )
  } catch (error) {
    // useApi already stores the error
  }
}


// ======================================================
// RETRY
// ======================================================

async function retryAttendance() {
  try {
    await retryAttendanceRequest(
      getAttendance
    )
  } catch (error) {
    // useApi already stores the error
  }
}

async function retryZip() {
  try {
    await retryZipRequest(
      getClientsByZipCode
    )
  } catch (error) {
    // useApi already stores the error
  }
}

async function retryEvents() {
  try {
    await retryEventsRequest(
      getEvents
    )
  } catch (error) {
    // useApi already stores the error
  }
}

async function retryServices() {
  try {
    await retryServicesRequest(
      getServices
    )
  } catch (error) {
    // useApi already stores the error
  }
}


// ======================================================
// INITIAL LOAD
// ======================================================

onMounted(() => {
  loadAttendance()
  loadZipData()
  loadEvents()
  loadServices()
})
</script>