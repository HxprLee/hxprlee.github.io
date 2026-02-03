<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Loader from "$lib/components/Loader.svelte";

  let loading = true;

  // --- State ---
  let timeHours = "";
  let timeMinutes = "";
  let showColon = true;
  let mounted = false;
  let countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  // --- Parallax & Tilt State ---
  let parallaxX = 0; // Global normalized -1 to 1
  let parallaxY = 0; // Global normalized -1 to 1
  let tiltX = 0; // Grid-scoped normalized -1 to 1
  let tiltY = 0; // Grid-scoped normalized -1 to 1

  // --- Configuration ---
  const GRADUATION_DATE = new Date("2026-06-11T07:30:00"); // Example date
  const LOCATION_TIMEZONE = "Asia/Ho_Chi_Minh"; // Vietnam Time

  // --- Logic ---

  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: LOCATION_TIMEZONE,
    });
    const parts = timeStr.split(":");
    timeHours = parts[0];
    timeMinutes = parts[1];
    showColon = !showColon;
  }

  function updateCountdown() {
    const now = new Date();
    const diff = GRADUATION_DATE.getTime() - now.getTime();

    if (diff > 0) {
      countdown = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    }
  }

  let timerInterval: ReturnType<typeof setInterval>;
  let lanyardInterval: ReturnType<typeof setInterval>;

  // --- Animation Logic ---
  let displayedName = "";
  let showToast = false;
  let visible = false;
  const fullName = "HxprLee";

  // --- Lanyard Logic ---
  let lanyardData: any = null;
  const DISCORD_ID = "1339588731300216955"; // Replace with your actual Discord ID

  async function fetchLanyard() {
    try {
      const response = await fetch(
        `https://api.lanyard.rest/v1/users/${DISCORD_ID}`,
      );
      const json = await response.json();
      if (json.success) lanyardData = json.data;
    } catch (e) {
      console.error("Lanyard fetch failed", e);
    }
  }

  function getDiscordAssetUrl(appId: string, assetId: string) {
    if (!assetId) return "";
    if (assetId.startsWith("mp:external")) {
      // Remove text before https and add :/ after https
      // Example: mp:external/.../https/i.scdn.co/... -> https:/i.scdn.co/...
      // Since it's usually https/domain, adding :/ makes it https://domain
      const httpsPart = assetId.split("https")[1];
      return "https:/" + httpsPart;
    }
    return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
  }

  function typeEffect() {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullName.length) {
        displayedName += fullName.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 2000);
  }

  // --- Audio Logic ---
  let audio: HTMLAudioElement;
  let isPlaying = false;
  let isMuted = false;
  let isLooping = true;
  let currentTime = 0;
  let duration = 0;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
  }

  function toggleMute() {
    isMuted = !isMuted;
    audio.muted = isMuted;
  }

  function toggleLoop() {
    isLooping = !isLooping;
  }

  function updateProgress() {
    currentTime = audio.currentTime;
  }

  function handleMetadata() {
    duration = audio.duration;
  }

  function seek(e: MouseEvent) {
    if (!duration) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    const percentage = angle / (2 * Math.PI);
    audio.currentTime = percentage * duration;
  }

  function handleMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }

  function handleGlobalMouseMove(e: MouseEvent) {
    // Parallax tracking (Global)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    parallaxX = (e.clientX - centerX) / centerX;
    parallaxY = (e.clientY - centerY) / centerY;
  }

  function handleGridMouseMove(e: MouseEvent) {
    // Tilt tracking (Scoped to Grid)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    tiltX = (e.clientX - centerX) / centerX;
    tiltY = (e.clientY - centerY) / centerY;
  }

  function resetTilt() {
    tiltX = 0;
    tiltY = 0;
  }

  onMount(() => {
    mounted = true;
    updateTime();
    updateCountdown();
    typeEffect();
    fetchLanyard();
    timerInterval = setInterval(() => {
      updateTime();
      updateCountdown();
    }, 1000);
    lanyardInterval = setInterval(fetchLanyard, 60000);
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
    if (lanyardInterval) clearInterval(lanyardInterval);
  });
</script>

{#if loading}
  <Loader
    on:complete={() => {
      loading = false;
      setTimeout(() => (visible = true), 50);
    }}
  />
{/if}

<svelte:window on:mousemove|capture={handleGlobalMouseMove} />

<!-- Background Parallax: Change -15 to adjust movement intensity -->
<div
  class="fixed inset-0 z-0 overflow-hidden"
  style="transform: translate({parallaxX * -15}px, {parallaxY *
    -15}px) scale(1.1)"
>
  <video muted autoplay loop class="w-screen h-screen object-cover relative filter brightness-[0.7] blur-[4px]">
    <source src="/bgs/selena_pianissimo_scene.mp4">
  </video>
  <!-- <img
    alt="Background"
    class="w-[100%] h-[100%] absolute filter brightness-[0.7] blur-[4px]"
    src="https://w.wallhaven.cc/full/ly/wallhaven-ly8okr.png"
  />
  <div class="absolute inset-0"></div> -->
</div>

<!-- Grid Tilting: Increase perspective (e.g., 2000px) for subtle tilt, decrease (e.g., 800px) for stronger tilt -->
{#if !loading}
  <main
    class="relative z-10 container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-center min-h-screen"
    style="perspective: 1200px;"
  >
    <!-- Grid Tilt: Change rotation multiplier (3) to adjust tilt intensity -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 gap-4 w-full max-w-6xl transition-transform duration-500 ease-out"
      on:mousemove={handleGridMouseMove}
      on:mouseleave={resetTilt}
      role="presentation"
      style="transform: rotateX({tiltY * -3}deg) rotateY({tiltX * 3}deg)"
    >
      {#if visible}
        <!-- Profile Card -->
        <div
          in:fly={{ y: 20, duration: 300, delay: 0 }}
          class="col-span-1 md:col-span-2 lg:col-span-6 glass-card rounded-lg p-7 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          <div class="flex items-start gap-5">
            <div
              class="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 border-[1.5px] border-primary"
            >
              <img
                alt="HxprLee's profile"
                class="w-full h-full bg-[#dcdcdc]"
                src="/imgs/pfp-icon.webp"
              />
            </div>
            <div>
              <h1
                class="text-2xl font-bold tracking-tight text-primary mb-1 h-[32px] flex items-center"
              >
                {displayedName}<span
                  class="w-[2px] h-[0.8em] bg-primary/70 ml-1 animate-pulse"
                ></span>
              </h1>
              <p
                class="text-base tracking-tight font-semibold text-primary/70 mb-1"
              >
                Junior UI Designer | FOSS Enthusiast | Linux User
              </p>
              <div
                class="flex items-center gap-2 tracking-tight text-sm font-semibold text-primary/50"
              >
                {#if lanyardData}
                  <span class="capitalize"
                    >{lanyardData.discord_status === "dnd"
                      ? "Do Not Disturb"
                      : lanyardData.discord_status}</span
                  >
                  <span
                    class="w-2 h-2 rounded-full border border-primary/50
                {lanyardData.discord_status === 'online' ? 'bg-[#23a55a]' : ''}
                {lanyardData.discord_status === 'idle' ? 'bg-[#f0b232]' : ''}
                {lanyardData.discord_status === 'dnd' ? 'bg-[#f23f43]' : ''}
                {lanyardData.discord_status === 'offline'
                      ? 'bg-[#80848e]'
                      : ''}"
                  ></span>
                {:else}
                  <span>Loading status...</span>
                  <span
                    class="w-2 h-2 rounded-full border border-primary/50 animate-pulse"
                  ></span>
                {/if}
              </div>
            </div>
          </div>
          <div
            class="mt-6 text-base font-medium tracking-tight leading-relaxed text-primary/90"
          >
            I am fascinated by the evolution of technology and user interfaces,
            with an interest in flat and glassmorphism design.
          </div>
        </div>

        <!-- Social Platforms -->
        <div
          in:fly={{ y: 40, duration: 600, delay: 300 }}
          class="col-span-1 md:col-span-1 lg:col-span-4 glass-card rounded-lg p-7 flex flex-col hover:border-primary/30 transition-colors duration-300"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          <h2 class="text-2xl font-bold tracking-tight text-primary mb-2">
            Social Platforms
          </h2>
          <p class="text-base font-medium tracking-tight text-primary/90 mb-6">
            You may find me on these social platforms, though I mostly active on <button
              class="underline decoration-1 underline-offset-2 hover:text-white transition-colors"
              ><a
                href="https://youtu.be/dQw4w9WgXcQ?si=BeotjcviyV3cNC51"
                target="_blank"
                rel="noopener noreferrer">Discord</a
              >
              <i class="fas fa-external-link-alt text-[10px]"></i></button
            >
          </p>
          <div class="flex items-center gap-6 mt-auto">
            <button
              class="text-primary hover:text-white hover:scale-110 transition-all"
              on:click={() => copyToClipboard("hxprlee")}
            >
              <i class="fab fa-discord text-3xl"></i>
            </button>
            <a
              class="text-primary hover:text-white hover:scale-110 transition-all"
              href="https://github.com/HxprLee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-github text-3xl"></i>
            </a>
            <a
              class="text-primary hover:text-white hover:scale-110 transition-all"
              href="https://www.youtube.com/@sampletext69420"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-youtube text-3xl"></i>
            </a>
            <a
              class="text-primary hover:text-white hover:scale-110 transition-all"
              href="https://x.com/hxprlee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-x-twitter text-3xl"></i>
            </a>
          </div>
        </div>

        <!-- Local Time -->
        <div
          in:fly={{ y: 40, duration: 600, delay: 450 }}
          class="col-span-1 lg:col-span-2 glass-card rounded-lg p-7 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300 min-h-[160px]"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          <div>
            <h3 class="text-primary tracking-tight text-2xl font-semibold mb-1">
              Local Time
            </h3>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-bold text-primary tracking-tight">
                {#if mounted}
                  {timeHours}<span
                    class="{showColon
                      ? 'opacity-100'
                      : 'opacity-0'} transition-opacity duration-100">:</span
                  >{timeMinutes}
                {:else}
                  --:--
                {/if}
              </span>
              <span class="text-base font-regular text-primary/50">UTC+7</span>
            </div>
          </div>
          <div
            class="mt-4 flex items-center gap-1 text-sm font-semibold text-primary/50"
          >
            <i class="fas fa-map-marker-alt"></i>
            <span>Vietnam</span>
          </div>
        </div>

        <!-- Skills & Objectives -->
        <div
          in:fly={{ y: 40, duration: 600, delay: 600 }}
          class="col-span-1 md:col-span-2 lg:col-span-5 glass-card rounded-lg p-7 flex flex-col gap-5 hover:border-primary/30 transition-colors duration-300"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          <div>
            <h3 class="text-primary tracking-tight font-semibold mb-3 text-2xl">
              What I've learned, so far...
            </h3>
            <div class="flex flex-wrap gap-2">
              <div
                class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary"
              >
                <i class="fab fa-figma"></i> Figma
              </div>
              <div
                class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary"
              >
                <i class="fab fa-css3-alt"></i> CSS
              </div>
              <div
                class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary"
              >
                <i class="fab fa-html5"></i> HTML
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-primary text-sm font-semibold mb-2 opacity-80">
              Current objective
            </h3>
            <div class="flex flex-wrap gap-2">
              <div
                class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary"
              >
                <i class="fas fa-film"></i> Davinci Resolve
              </div>
              <div
                class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary"
              >
                <i class="fab fa-python"></i> Python
              </div>
              <div
                class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary"
              >
                <i class="fa-brands fa-dart-lang"></i><i
                  class="fa-brands fa-flutter"
                ></i> Dart/Flutter
              </div>
            </div>
          </div>
        </div>

        <!-- Discord Embed -->
        <div
          in:fly={{ y: 40, duration: 600, delay: 750 }}
          class="col-span-1 md:row-span-2 lg:col-span-3 glass-card rounded-lg p-0 flex flex-col hover:border-primary/30 transition-colors duration-300 min-h-[200px]"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          {#if lanyardData}
            <div class="flex flex-col items-left gap-3 mb-4">
              <img
                class="w-full h-[92px] object-cover"
                alt="Background"
                src="/imgs/banner.webp"
              />
              <div class="absolute ml-5 mt-8">
                <img
                  src="https://cdn.discordapp.com/avatars/{DISCORD_ID}/{lanyardData
                    .discord_user.avatar}.png"
                  alt="Avatar"
                  class="w-20 h-20 rounded-full border-2 border-primary/20"
                />
                <div
                  class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-background-dark
              {lanyardData.discord_status === 'online' ? 'bg-[#23a55a]' : ''}
              {lanyardData.discord_status === 'idle' ? 'bg-[#f0b232]' : ''}
              {lanyardData.discord_status === 'dnd' ? 'bg-[#f23f43]' : ''}
              {lanyardData.discord_status === 'offline' ? 'bg-[#80848e]' : ''}"
                ></div>
              </div>
              <div class="flex flex-col overflow-hidden mt-5 ml-5">
                <div class="flex flex-row overflow-hidden gap-2">
                  <span
                    class="text-primary font-bold text-xl truncate tracking-tight leading-tight"
                    >{lanyardData.discord_user.display_name ||
                      lanyardData.discord_user.username}</span
                  >
                  <span
                    class="bg-tag-bg/80 border border-primary/10 px-2 py-0 rounded-md text-xs font-semibold flex items-center gap-2 text-primary"
                  >
                    <img
                      class="w-3 h-3"
                      alt="Badge"
                      src="https://cdn.discordapp.com/clan-badges/{lanyardData
                        .discord_user.primary_guild
                        .identity_guild_id}/{lanyardData.discord_user
                        .primary_guild.badge}.png"
                    />
                    {lanyardData.discord_user.primary_guild.tag}
                  </span>
                </div>
                <span
                  class="text-primary/50 text-xs font-extrabold tracking-tight truncate"
                  >@{lanyardData.discord_user.username}</span
                >
              </div>
            </div>

            <div
              class="flex flex-col gap-3 flex bg-tag-bg/70 pb-4 pt-3 px-4 rounded-md shadow-lg mx-5 mb-5 border border-primary/10"
            >
              {#if lanyardData.listening_to_spotify}
                <div class="flex flex-col gap-1">
                  <span
                    class="text-[10px] font-bold text-primary/40 uppercase tracking-wider"
                    >Listening to Spotify</span
                  >
                  <div class="flex items-center gap-3">
                    <img
                      src={lanyardData.spotify.album_art_url}
                      alt="Spotify"
                      class="w-10 h-10 rounded-md"
                    />
                    <div class="flex flex-col overflow-hidden">
                      <span class="text-xs font-semibold text-primary truncate"
                        >{lanyardData.spotify.track}</span
                      >
                      <span class="text-[10px] text-primary/60 truncate"
                        >by {lanyardData.spotify.artist}</span
                      >
                    </div>
                  </div>
                </div>
              {:else if lanyardData.activities.length > 0}
                <div class="flex flex-col gap-2">
                  <span class="text-xs font-extrabold text-primary/40 uppercase"
                    >Playing {lanyardData.activities[0].name}</span
                  >
                  <div class="flex items-center gap-3">
                    {#if lanyardData.activities[0].assets?.large_image}
                      <img
                        src={getDiscordAssetUrl(
                          lanyardData.activities[0].application_id,
                          lanyardData.activities[0].assets.large_image,
                        )}
                        alt="Activity"
                        class="w-[60px] h-[60px] rounded-md"
                      />
                    {:else}
                      <div
                        class="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center"
                      >
                        <i class="fas fa-gamepad text-primary/40"></i>
                      </div>
                    {/if}
                    <div class="flex flex-col overflow-hidden span-1">
                      <span
                        class="text-sm tracking-tight font-bold text-primary truncate"
                        >{lanyardData.activities[0].details || "Playing"}</span
                      >
                      <span
                        class="text-xs tracking-tight text-primary/80 font-medium truncate"
                        >{lanyardData.activities[0].state || ""}</span
                      >
                      <span
                        class="text-xs tracking-tight text-primary/60 font-medium truncate"
                        >{lanyardData.activities[0].assets.large_text}</span
                      >
                    </div>
                  </div>
                </div>
              {:else}
                <div
                  class="flex-1 flex flex-col items-center justify-center opacity-30 text-center py-2"
                >
                  <i class="fab fa-discord text-4xl mb-2"></i>
                  <span class="text-xs font-semibold">No activity detected</span
                  >
                </div>
              {/if}
            </div>
          {:else}
            <div
              class="flex-1 flex flex-col items-center justify-center opacity-30 animate-pulse"
            >
              <i class="fab fa-discord text-4xl mb-2"></i>
              <span class="text-xs font-semibold"
                >Loading Discord Profile...</span
              >
            </div>
          {/if}
        </div>

        <!-- Countdown -->
        <div
          in:fly={{ y: 40, duration: 600, delay: 900 }}
          class="col-span-1 md:col-span-3 lg:col-span-7 glass-card rounded-lg p-7 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-primary/30 transition-colors duration-300"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          <div class="flex items-center gap-4">
            <span class="text-primary tracking-tight font-bold text-2xl"
              >Countdown</span
            >
            <span class="text-primary text-xl tracking-tight hidden md:inline"
              >High school graduation exam</span
            >
            <span class="text-gray-300 text-sm md:hidden">Graduation exam</span>
          </div>
          <div class=" text-2xl text-primary tracking-tight font-semibold">
            {countdown.days}<span class="text-base align-bottom mr-1">D</span
            >|<span class="mx-1"></span>{countdown.hours}<span
              class="text-base align-bottom mr-1">H</span
            >|<span class="mx-1"></span>{countdown.minutes}<span
              class="text-base align-bottom mr-1">M</span
            >|<span class="mx-1"></span>{countdown.seconds}<span
              class="text-base align-bottom">S</span
            >
          </div>
        </div>
      {/if}
    </div>

    <!-- Floating Music Widget -->
    {#if visible}
      <div
        in:fly={{ y: 40, duration: 600, delay: 1050 }}
        class="mt-12 w-full max-w-md"
      >
        <audio
          bind:this={audio}
          src="/audios/bg-audio.mp3"
          on:timeupdate={updateProgress}
          on:loadedmetadata={handleMetadata}
          loop={isLooping}
        ></audio>
        <div
          class="glass-card rounded-full p-3 flex items-center justify-between shadow-2xl border border-white/10"
          role="presentation"
          on:mousemove={handleMouseMove}
        >
          <div class="flex items-center gap-3">
            <div class="relative w-[50px] h-[50px] group">
              <!-- Circular Progress Bar -->
              <svg
                class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 100 100"
              >
                <!-- Background circle removed to fix "weird line" -->
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="transparent"
                  stroke-width="0"
                />
                <!-- Progress circle -->
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-dasharray="301.59"
                  stroke-dashoffset={301.59 -
                    301.59 * (currentTime / (duration || 1))}
                  class="text-primary transition-all duration-200"
                  stroke-linecap="round"
                />
              </svg>

              <div class="absolute inset-[3px] rounded-full overflow-hidden">
                <img
                  alt="Album Art"
                  class="w-full h-full object-cover animate-spin-slow"
                  style="animation-play-state: {isPlaying
                    ? 'running'
                    : 'paused'}"
                  src="/imgs/artwork.webp"
                />

                <!-- Play/Pause Overlay -->
                <button
                  on:click|stopPropagation={togglePlay}
                  class="absolute inset-0 bg-black/40 flex items-center justify-center {isPlaying
                    ? 'opacity-0'
                    : 'opacity-100'} group-hover:opacity-100 transition-opacity duration-200"
                >
                  <i
                    class="fas {isPlaying
                      ? 'fa-pause'
                      : 'fa-play'} text-primary text-xl"
                  ></i>
                </button>
              </div>
            </div>
            <div class="flex flex-col">
              <span class="text-base tracking-tight font-semibold text-primary"
                >The Cozy Room</span
              >
              <span class="text-sm text-primary/80 font-semibold"
                >Fontainebleau</span
              >
            </div>
          </div>
          <div class="flex items-center gap-5 pr-3">
            <button
              on:click={toggleLoop}
              class="{isLooping
                ? 'text-primary'
                : 'text-primary/40'} hover:text-primary transition-colors text-2xl"
            >
              <i class="fas fa-repeat"></i>
            </button>
            <button
              on:click={toggleMute}
              class="text-primary hover:text-primary/70 transition-colors text-2xl"
            >
              <i class="fas {isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
            </button>
          </div>
        </div>
        <div
          class="w-2/3 mx-auto h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -mt-16 mb-16 pointer-events-none"
        ></div>
      </div>
    {/if}

    <!-- Toast Notification -->
    {#if showToast}
      <div
        in:fly={{ y: 20, duration: 300 }}
        out:fade={{ duration: 200 }}
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-tag-bg/70 text-white px-6 py-2 rounded-full shadow-lg backdrop-blur-md border border-primary/10 transition-all duration-300"
      >
        <span class="text-sm font-semibold tracking-tight text-primary"
          >Copied to clipboard!</span
        >
      </div>
    {/if}
  </main>
{/if}

<style>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin 10s linear infinite;
  }
</style>
