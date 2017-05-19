<div class="{{ $classes }}" data-calendar-id="{{ $calendar_id }}">
    @if (!$hideTitle && !empty($post_title))
    <h4 class="box-title">{!! apply_filters('the_title', $post_title) !!}</h4>
    @endif

    <div class="box-content">
        <div class="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>
