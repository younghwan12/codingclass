<ul>
<?php
    $blogNewSql = "SELECT * FROM myblog WHERE blogDelete = 0 ORDER BY myBlogID DESC LIMIT 4";
    $blogNewResult = $connect -> query($blogNewSql);

    foreach($blogNewResult as $blogNew){ ?>
        <li>
            <a href="blogView.php?blogID=<?=$blogNew['myBlogID']?>"><span><img src="../assets/img/blog/<?=$blogNew['blogImgFile']?>" alt="img"></span>
        <em><?=$blogNew['blogContents']?></em>
    </a>
</li>
    <?php }
?>
</ul>