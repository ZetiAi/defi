<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
	import { formatComma } from '$lib/utils/formatNumbersByLang';
	import { _ } from 'svelte-i18n';
	export let title: string;
	export let display = 0;
	export let isPercentage = false;
</script>

<div
	class="flex h-32 w-full  flex-col justify-between overflow-hidden rounded-xl bg-white p-3  opacity-95 shadow-md dark:bg-neutral-800 dark:text-white dark:shadow-none">
	<h3 class="text-center font-semibold ">{title}</h3>
	{#if display && $page.params.lang}
		{#if isPercentage && isPercentage != null}
			<div
				in:fade={{ duration: 500 }}
				class="flex items-center justify-center ">
				{#if display < 0}
					<Fa icon={faCaretDown} size={'2x'} color="#ff2d50" />
				{:else if display > 0}
					<Fa icon={faCaretUp} size={'2x'} color="#5efb4e" />
				{/if}
				<p class="ml-1 text-2xl">
					{formatComma(Math.abs(display), $page.params.lang)}%
				</p>
			</div>
		{:else}
			<p class="text-center text-2xl">
				${formatComma(display, $page.params.lang)}
			</p>
		{/if}
	{:else}
		<p class="text-center text-lg">{$_('actions.notAvaliable')}</p>
	{/if}

	<p />
</div>
