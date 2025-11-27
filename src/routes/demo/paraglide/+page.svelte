<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
</script>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>
<div>
	<button onclick={() => setLocale('en')} type="button">en</button>
	<button onclick={() => setLocale('es')} type="button">es</button>
</div>
<p>
	If you use VSCode, install the <a href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension" rel="noopener noreferrer" target="_blank">Sherlock i18n extension</a> for a better i18n experience.
</p>
