<?php global $post; ?>
<div class="<?php echo implode(' ', apply_filters('Modularity/Module/Classes', array('box', 'box-panel'), $module->post_type, $args)); ?>">
    <?php if (!empty($module->post_title)) { ?>
        <h4 class="box-title"><?php echo apply_filters('the_title', $module->post_title); ?></h4>
    <?php } ?>

    <table class="table table-bordered">
        <tbody>
        <?php foreach (\ModularityDictionary\Dictionary::getMatchingWords($post) as $word) : ?>
            <tr>
                <td><?php echo $word['word']; ?></td>
                <td><?php echo $word['explanation']; ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>
