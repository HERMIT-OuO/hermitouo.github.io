<div :class="$style.container">
    <div :class="$style.blockLeft">
        <!-- 个人信息 -->
        <img scr="/img/avatar.png">
        <div>Tianyu Gao</div>
    </div>
    <div :class="$style.blockRight">
        <!-- 简介 -->
    </div>
</div>

<style module>
/deep/ .page {
    margin-left: 0 !important; 
}

.container {
    position: absolute;
    left: 0;
    right: 0;
    margin:auto;

    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    /* margin-left: -18rem; */
    max-width: 1400px;


    border-radius: 0.25rem;
    border-width: 2px;
    border-style: solid;
    --tw-border-opacity: 1;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}

.block-left {
    width: 33%;
    float: left;
}

.block-right {
    width: 65%;
    float: right;
}
</style>
