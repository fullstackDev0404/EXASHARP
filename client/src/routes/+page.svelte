<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import type { PageData } from './$types';

    // The 'data' prop is automatically populated by +page.server.ts
    let { data }: { data: PageData } = $props();
</script>
<header class="flex items-center sticky top-0 h-15 bg-emerald-400 justify-between px-15">
    <div class="text-2xl font-mono flex items-center gap-3"><img src={favicon} alt="O" class="h-7"> DEMO</div>
    <ul class=" flex items-center gap-6">
        <li>About</li>
        <li>Contact</li>
    </ul>
</header>

<main>
    <section class="h-70 flex justify-center items-center text-4xl bg-lime-200 text-mauve-700">
    <p>This is a Sample page. {data.backendMessage}</p>
    </section>
    <section class="p-15 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, magnam officiis quia ea asperiores alias ullam facilis reprehenderit magni quae eaque voluptate exercitationem aliquid consequuntur iure sint distinctio adipisci tempora deleniti rerum dolores quis sapiente inventore? Asperiores, iste ipsam necessitatibus velit et quo ea eligendi fugiat aut illo, incidunt, quia autem quam aperiam mollitia eos deleniti? Veniam, est voluptate aliquid a, minus id, numquam consequuntur officiis eius itaque incidunt dolorum blanditiis officia assumenda reprehenderit vero velit nam. Fugiat numquam minus blanditiis nihil temporibus! Quia, quis. Asperiores nisi sint sapiente corporis impedit necessitatibus aut quae facere perspiciatis laboriosam, eius quis alias nobis labore soluta placeat fugit reprehenderit, quidem deserunt accusamus non? Sunt tempora illo distinctio dolorem dicta ut delectus voluptatum voluptate molestias ex quasi consectetur sequi repudiandae nihil reprehenderit quibusdam sed, ipsum quidem cum deserunt? Molestias laborum sed quisquam totam modi fugiat hic at autem, ut nobis sapiente. Vitae fugit eius repellendus accusamus natus, corporis cupiditate consequuntur, ipsum, modi dicta quaerat non voluptas repellat fuga neque! Sunt cumque commodi sequi mollitia, eligendi, obcaecati magni qui incidunt, illo saepe provident esse! Soluta ullam labore natus doloremque, odio earum mollitia eligendi nisi, nesciunt accusamus, minima inventore nam animi repellat molestias! Dolores nobis nostrum cupiditate veritatis mollitia quasi atque, a rerum illum soluta laborum ad sapiente omnis minima rem vel, in sint perferendis accusamus neque unde nam. Animi modi omnis doloremque? Architecto modi voluptas eaque quos provident similique incidunt, vero nihil ab nesciunt distinctio quidem tempore nemo. Molestias, quidem? Explicabo nulla ab non vero excepturi ipsum ratione quasi fugit quas architecto, delectus reprehenderit accusantium numquam quae velit suscipit iusto commodi autem? Architecto doloribus iusto quia deleniti, quidem omnis sit tenetur a eum neque minima nostrum assumenda necessitatibus error sequi animi dolor dolores dignissimos? Veritatis nobis atque rem ea ipsa? Laboriosam facere eveniet velit numquam.</section>
</main>

<footer class="flex items-center bg-emerald-400 py-3 justify-center">
<div class="">Made with Sveltekit & ElysiaJS</div>
</footer>