<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    let progress = 0;
    let animationDone = false;
    let showLines = false;
    let showFinalSvgs = false;

    // Simulate asset loading or hook into actual loading if possible
    onMount(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                progress += 1;
            } else {
                clearInterval(interval);
                startCompletionSequence();
            }
        }, 20); //Speed
    });

    function startCompletionSequence() {
        showLines = true;

        // Sequence:
        // 1. Lines sweep in (0-1s)
        // 2. While they are crossing/paused (0.6s), stack final SVGs
        setTimeout(() => {
            showFinalSvgs = true;
        }, 600);

        // 3. Complete whole animation and fade out
        setTimeout(() => {
            dispatch("complete");
        }, 2200);
    }
</script>

<div
    class="fixed inset-0 z-[100] bg-[#11171C] flex items-center justify-center overflow-hidden"
    out:fade={{ duration: 700 }}
>
    <!-- Progress SVGs (0 and 1) -->
    <div class="relative w-[220px] h-[220px]">
        {#if progress >= 0}
            <div
                class="absolute inset-0 transition-opacity duration-300"
                style="opacity: {Math.min(progress * 2, 100) / 100}"
            >
                <img src="/svgs/0.svg" alt="Loader 0" class="w-full h-full" />
            </div>
        {/if}

        {#if progress > 50}
            <div
                class="absolute inset-0 transition-opacity duration-300"
                style="opacity: {Math.min((progress - 50) * 2, 100) / 100}"
            >
                <img src="/svgs/1.svg" alt="Loader 1" class="w-full h-full" />
            </div>
        {/if}

        <!-- Final SVGs (2 and 3) - Stacked on top of 0 and 1 -->
        {#if showFinalSvgs}
            <div in:fade={{ duration: 300 }} class="absolute inset-0">
                <img
                    src="/svgs/2.svg"
                    alt="Loader 2"
                    class="w-full h-full absolute inset-0"
                />
            </div>
            <div
                in:fade={{ duration: 300, delay: 200 }}
                class="absolute inset-0"
            >
                <img
                    src="/svgs/3.svg"
                    alt="Loader 3"
                    class="w-full h-full absolute inset-0"
                />
            </div>
        {/if}
    </div>

    <!-- Crossing Lines -->
    {#if showLines}
        <div class="absolute inset-0 pointer-events-none">
            <div class="line line-1" style="--offset: -2px;"></div>
            <div class="line line-2" style="--offset: 65px;"></div>
        </div>
    {/if}
</div>

<style>
    .line {
        position: absolute;
        background-color: #fee086;
        height: 2.5px;
        width: 150vw; /* Wide enough to cover diagonals */
        top: 50%;
        left: 50%;
        z-index: 10;
        pointer-events: none;
    }

    /* Clip-path animation for "running tips" effect */
    @keyframes sweep-1 {
        0% {
            clip-path: inset(0 100% 0 0);
            transform: translate(-50%, -50%) rotate(45deg);
        }
        40% {
            clip-path: inset(0 0 0 0);
            transform: translate(-50%, -50%) rotate(45deg);
        }
        70% {
            clip-path: inset(0 0 0 0);
            transform: translate(-50%, -50%) rotate(45deg);
        }
        100% {
            clip-path: inset(0 0 0 100%);
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }

    @keyframes sweep-2 {
        0% {
            clip-path: inset(0 0 0 100%);
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        40% {
            clip-path: inset(0 0 0 0);
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        70% {
            clip-path: inset(0 0 0 0);
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        100% {
            clip-path: inset(0 100% 0 0);
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }

    .line-1 {
        margin-top: var(--offset);
        animation: sweep-1 1.5s forwards ease-in;
    }

    .line-2 {
        margin-top: calc(-1 * var(--offset));
        animation: sweep-2 1.5s forwards ease-in;
        animation-delay: 100ms;
    }
</style>
