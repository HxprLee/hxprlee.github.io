<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  // --- State ---
  let timeHours = "";
  let timeMinutes = "";
  let showColon = true;
  let mounted = false;
  let countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // --- Configuration ---
  const GRADUATION_DATE = new Date('2026-06-11T07:30:00'); // Example date
  const LOCATION_TIMEZONE = 'Asia/Ho_Chi_Minh'; // Vietnam Time

  // --- Logic ---
  
  function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: LOCATION_TIMEZONE
    });
    const parts = timeStr.split(':');
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
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    }
  }

  let timerInterval: ReturnType<typeof setInterval>;

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
      const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
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

  onMount(() => {
    mounted = true;
    visible = true;
    updateTime();
    updateCountdown();
    typeEffect();
    fetchLanyard();
    timerInterval = setInterval(() => {
      updateTime();
      updateCountdown();
    }, 1000);
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });
</script>


<!-- Background -->
<div class="fixed inset-0 z-0">
  <img 
    alt="Background" 
    class="w-full h-full object-cover filter brightness-[0.8] blur-[4px] scale-100" 
    src="https://w.wallhaven.cc/full/ly/wallhaven-ly8okr.png"
  />
  <div class="absolute inset-0"></div>
</div>

<main class="relative z-10 container mx-auto px-4 py-8 lg:py-16 flex flex-col items-center justify-center min-h-screen">
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 gap-4 w-full max-w-6xl">
    
    {#if visible}
    <!-- Profile Card -->
    <div in:fly={{ y: 20, duration: 600, delay: 100 }} class="col-span-1 md:col-span-2 lg:col-span-6 glass-card rounded-lg p-7 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300">
      <div class="flex items-start gap-5">
        <div class="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 border-[1.5px] border-primary">
             <img
                alt="Profile Picture" 
                class="w-full h-full bg-[#dcdcdc]" 
                src="/imgs/pfp-icon.png"
             />
        </div>
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-primary mb-1 h-[32px] flex items-center">
            {displayedName}<span class="w-[2px] h-[0.8em] bg-primary/70 ml-1 animate-pulse"></span>
          </h1>
          <p class="text-base tracking-tight font-semibold text-primary/70 mb-1">Junior UI Designer | FOSS Enthusiast | Linux User</p>
          <div class="flex items-center gap-2 tracking-tight text-sm font-semibold text-primary/50">
            {#if lanyardData}
              <span class="capitalize">{lanyardData.discord_status === 'dnd' ? 'Do Not Disturb' : lanyardData.discord_status}</span>
              <span 
                class="w-2 h-2 rounded-full border border-primary/50 
                {lanyardData.discord_status === 'online' ? 'bg-[#23a55a]' : ''}
                {lanyardData.discord_status === 'idle' ? 'bg-[#f0b232]' : ''}
                {lanyardData.discord_status === 'dnd' ? 'bg-[#f23f43]' : ''}
                {lanyardData.discord_status === 'offline' ? 'bg-[#80848e]' : ''}"
              ></span>
            {:else}
              <span>Loading status...</span>
              <span class="w-2 h-2 rounded-full border border-primary/50 animate-pulse"></span>
            {/if}
          </div>
        </div>
      </div>
      <div class="mt-6 text-base font-medium tracking-tight leading-relaxed text-primary/90">
        I am fascinated by the evolution of technology and user interfaces, with an interest in flat and glassmorphism design.
      </div>
    </div>

    <!-- Social Platforms -->
    <div in:fly={{ y: 20, duration: 600, delay: 200 }} class="col-span-1 md:col-span-1 lg:col-span-4 glass-card rounded-lg p-7 flex flex-col hover:border-primary/30 transition-colors duration-300">
      <h2 class="text-2xl font-bold tracking-tight text-primary mb-2">Social Platforms</h2>
      <p class="text-base font-medium tracking-tight text-primary/90 mb-6">
        You may find me on these social platforms, though I mostly active on <button class="underline decoration-1 underline-offset-2 hover:text-white transition-colors" on:click={() => copyToClipboard('hxprlee')}>Discord <i class="fas fa-external-link-alt text-[10px]"></i></button>
      </p>
      <div class="flex items-center gap-6 mt-auto">
        <button class="text-primary hover:text-white hover:scale-110 transition-all" on:click={() => copyToClipboard('hxprlee')}>
          <i class="fab fa-discord text-3xl"></i>
        </button>
        <a class="text-primary hover:text-white hover:scale-110 transition-all" href="#">
          <i class="fab fa-github text-3xl"></i>
        </a>
        <a class="text-primary hover:text-white hover:scale-110 transition-all" href="#">
          <i class="fab fa-youtube text-3xl"></i>
        </a>
        <a class="text-primary hover:text-white hover:scale-110 transition-all" href="#">
          <i class="fab fa-x-twitter text-3xl"></i>
        </a>
      </div>
    </div>

    <!-- Local Time -->
    <div in:fly={{ y: 20, duration: 600, delay: 300 }} class="col-span-1 lg:col-span-2 glass-card rounded-lg p-7 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300 min-h-[160px]">
      <div>
        <h3 class="text-primary tracking-tight text-2xl font-semibold mb-1">Local Time</h3>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-primary tracking-tight">
            {#if mounted}
              {timeHours}<span class="{showColon ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100">:</span>{timeMinutes}
            {:else}
              --:--
            {/if}
          </span>
          <span class="text-base font-regular text-primary/50">UTC+7</span>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-1 text-sm font-semibold text-primary/50">
        <i class="fas fa-map-marker-alt"></i>
        <span>Vietnam</span>
      </div>
    </div>

    <!-- Skills & Objectives -->
    <div in:fly={{ y: 20, duration: 600, delay: 400 }} class="col-span-1 md:col-span-2 lg:col-span-5 glass-card rounded-lg p-7 flex flex-col gap-5 hover:border-primary/30 transition-colors duration-300">
      <div>
        <h3 class="text-primary tracking-tight font-semibold mb-3 text-2xl">What I've learned, so far...</h3>
        <div class="flex flex-wrap gap-2">
          <div class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary">
            <i class="fab fa-figma"></i> Figma
          </div>
          <div class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary">
            <i class="fab fa-css3"></i> CSS
          </div>
          <div class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary">
            <i class="fab fa-html5"></i> HTML
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-primary text-sm font-semibold mb-2 opacity-80">Current objective</h3>
        <div class="flex flex-wrap gap-2">
          <div class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary">
            <i class="fas fa-film"></i> Davinci Resolve
          </div>
          <div class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary">
            <i class="fab fa-python"></i> Python
          </div>
          <div class="bg-tag-bg/80 border border-primary/10 px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-2 text-primary">
            <i class="fa-brands fa-dart-lang"></i> Dart/Flutter
          </div>
        </div>
      </div>
    </div>

    <!-- Discord Embed -->
    <div in:fly={{ y: 20, duration: 600, delay: 500 }} class="col-span-1 md:row-span-2 lg:col-span-3 glass-card rounded-lg p-0 flex flex-col hover:border-primary/30 transition-colors duration-300 min-h-[200px]">
      {#if lanyardData}
        <div class="flex flex-col items-left gap-3 mb-4">
          <img class="w-full h-24 object-cover" alt="Background" src="https://w.wallhaven.cc/full/ly/wallhaven-ly8okr.png"/>
          <div class="absolute ml-5 mt-9">
            <img 
              src="https://cdn.discordapp.com/avatars/{DISCORD_ID}/{lanyardData.discord_user.avatar}.png" 
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
            <span class="text-primary font-bold text-base truncate leading-tight">{lanyardData.discord_user.display_name || lanyardData.discord_user.username}</span>
            <span class="text-primary/50 text-xs font-bold truncate">@{lanyardData.discord_user.username}</span>
          </div>
        </div>

        <div class="flex flex-col gap-3 flex bg-tag-bg/70 pb-4 pt-3 px-4 rounded-md shadow-lg mx-5 mb-5 border border-primary/10">
          {#if lanyardData.listening_to_spotify}
            <div class="flex flex-col gap-1">
              <span class="text-[10px] font-bold text-primary/40 uppercase tracking-wider">Listening to Spotify</span>
              <div class="flex items-center gap-3">
                <img src={lanyardData.spotify.album_art_url} alt="Spotify" class="w-10 h-10 rounded-md" />
                <div class="flex flex-col overflow-hidden">
                  <span class="text-xs font-semibold text-primary truncate">{lanyardData.spotify.track}</span>
                  <span class="text-[10px] text-primary/60 truncate">by {lanyardData.spotify.artist}</span>
                </div>
              </div>
            </div>
          {:else if lanyardData.activities.length > 0}
            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold text-primary/40 uppercase tracking-wider">Playing {lanyardData.activities[0].name}</span>
              <div class="flex items-center gap-3">
                {#if lanyardData.activities[0].assets?.large_image}
                  <img 
                    src={getDiscordAssetUrl(lanyardData.activities[0].application_id, lanyardData.activities[0].assets.large_image)} 
                    alt="Activity" 
                    class="w-[60px] h-[60px] rounded-md" 
                  />
                {:else}
                  <div class="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                    <i class="fas fa-gamepad text-primary/40"></i>
                  </div>
                {/if}
                <div class="flex flex-col overflow-hidden span-1">
                  <span class="text-xs font-bold text-primary truncate">{lanyardData.activities[0].details || 'Playing'}</span>
                  <span class="text-xs text-primary/80 font-medium truncate">{lanyardData.activities[0].state || ''}</span>
                  <span class="text-xs text-primary/60 font-medium truncate">{lanyardData.activities[0].assets.large_text}</span>
                </div>
              </div>
            </div>
          {:else}
            <div class="flex-1 flex flex-col items-center justify-center opacity-30 text-center">
              <i class="fab fa-discord text-4xl mb-2"></i>
              <span class="text-xs font-semibold">No activity detected</span>
            </div>
          {/if}
        </div>
      {:else}
        <div class="flex-1 flex flex-col items-center justify-center opacity-30 animate-pulse">
          <i class="fab fa-discord text-4xl mb-2"></i>
          <span class="text-xs font-semibold">Loading Discord Profile...</span>
        </div>
      {/if}
    </div>

    <!-- Countdown -->
    <div in:fly={{ y: 20, duration: 600, delay: 600 }} class="col-span-1 md:col-span-3 lg:col-span-7 glass-card rounded-lg p-7 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-primary/30 transition-colors duration-300">
      <div class="flex items-center gap-4">
        <span class="text-primary tracking-tight font-bold text-2xl">Countdown</span>
        <span class="text-primary text-xl tracking-tight hidden md:inline">High school graduation exam</span>
        <span class="text-gray-300 text-sm md:hidden">Graduation exam</span>
      </div>
      <div class=" text-2xl text-primary tracking-tight font-semibold">
         {countdown.days}<span class="text-base align-bottom mr-1">D</span>|<span class="mx-1"></span>{countdown.hours}<span class="text-base align-bottom mr-1">H</span>|<span class="mx-1"></span>{countdown.minutes}<span class="text-base align-bottom mr-1">M</span>|<span class="mx-1"></span>{countdown.seconds}<span class="text-base align-bottom">S</span>
      </div>
    </div>
    {/if}

  </div>

  <!-- Floating Music Widget (Restored from reference code, removed "integrated" card to match request) -->
  {#if visible}
  <div in:fly={{ y: 20, duration: 600, delay: 700 }} class="mt-12 w-full max-w-md">
      <audio 
        bind:this={audio} 
        src="/audios/bg-audio.mp3" 
        on:timeupdate={updateProgress}
        on:loadedmetadata={handleMetadata} 
        autoplay
        loop={isLooping}
      ></audio>
      <div class="glass-card rounded-full p-3 flex items-center justify-between shadow-2xl border border-white/10">
          <div class="flex items-center gap-3">
              <div class="relative w-[50px] h-[50px] group">
                  <!-- Circular Progress Bar -->
                  <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                      <!-- Background circle -->
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        stroke-width="4"
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
                        stroke-dashoffset={301.59 - (301.59 * (currentTime / (duration || 1)))}
                        class="text-primary transition-all duration-200"
                        stroke-linecap="round"
                      />
                  </svg>
                  
                  <div class="absolute inset-[3px] rounded-full overflow-hidden border border-white/20">
                      <img alt="Album Art" class="w-full h-full object-cover" src="/imgs/artwork.png"/>
                      
                      <!-- Play/Pause Overlay -->
                      <button 
                        on:click|stopPropagation={togglePlay}
                        class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <i class="fas {isPlaying ? 'fa-pause' : 'fa-play'} text-primary text-xl"></i>
                      </button>
                  </div>
              </div>
              <div class="flex flex-col">
                  <span class="text-base tracking-tight font-semibold text-primary">The Cozy Room</span>
                  <span class="text-sm text-primary/80 font-semibold">Fontainebleau</span>
              </div>
          </div>
          <div class="flex items-center gap-5 pr-3">
              <button 
                on:click={toggleLoop}
                class="{isLooping ? 'text-primary' : 'text-primary/40'} hover:text-primary transition-colors text-2xl"
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
      <div class="w-2/3 mx-auto h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -mt-16 mb-16 pointer-events-none"></div>
  </div>
  {/if}

  <!-- Toast Notification -->
  {#if showToast}
    <div 
      in:fly={{ y: 20, duration: 300 }}
      out:fade={{ duration: 200 }}
      class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-tag-bg/70 text-white px-6 py-2 rounded-full shadow-lg backdrop-blur-md border border-primary/10 transition-all duration-300"
    >
      <span class="text-sm font-semibold tracking-tight text-primary ">Copied to clipboard!</span>
    </div>
  {/if}

</main>
