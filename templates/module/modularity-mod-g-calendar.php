<div class="<?php echo implode(' ', apply_filters('Modularity/Module/Classes', array('box', 'box-panel'), $module->post_type, $args)); ?>" data-calendar-id="<?php echo get_field('calendar_id', $module->ID); ?>">
    <h4 class="box-title"><?php echo $module->post_title; ?></h4>
    <div class="box-content">
        <div class="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>
