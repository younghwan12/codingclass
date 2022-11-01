<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>글 읽기</title>

    <!-- link -->
    <?php include "../include/link.php"?>


    
</head>
<body>
    <div id="skip">
        <a href="#header">헤더 영역 바로가기</a>
        <a href="#main">컨텐츠 영역 바로가기</a>
        <a href="#footer">푸터 영역 바로가기</a>
    </div>
    <!-- //skip -->

    <?php include "../include/header.php"?>
    <!-- header -->

    <section id="board" class="container">
            <h2>게시판 보기 영역입니다.</h2>
            <div class="board__inner">
                <div class="board__title">
                    <h3>게시판</h3>
                    <p>웹디자이너, 웹퍼블리셔, 프론트앤드 개발자를 위한 게시판입니다.</p>
                </div>
                <div class="board__view">
                    <table>
                        <colgroup>
                        <col style="width: 20%">
                        <col style="width: 80%">
                    </colgroup>
                    <tbody>
                        <!-- <tr>
                            <th>제목</th>
                            <td>게시판 제목입니다.</td>
                        </tr>
                        <tr>
                            <th>등록자</th>
                            <td>이영환</td>
                        </tr>
                        <tr>
                            <th>등록일</th>
                            <td>2022.09.22</td>
                        </tr>
                        <tr>
                            <th>조회수</th>
                            <td>999</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td class="height">
                                못할 우리 행복스럽고 싸인 현저하게 사라지지 말이다. 더운지라 불어 않는 따뜻한 영락과 귀는 인간에 할지라도 이것이다. 이상을 그들은 웅대한 무엇을 철환하였는가? 사는가 아니더면, 곳이 이상의 약동하다. 그들을 싹이 사랑의 인간에 열락의 새 얼마나 동산에는 착목한는 쓸쓸하랴? 사는가 있는 이상, 눈에 기관과 있는 생생하며, 목숨이 곧 사막이다. 우는 무엇을 눈에 주며, 설산에서 가치를 없는 옷을 못할 것이다. 이 인생을 것은 그들의 황금시대다. 청춘의 있을 가는 기관과 곳으로 이성은 옷을 것이다. 구하지 무한한 인간이 군영과 것이다. 더운지라 있는 끓는 말이다.
                                바이며, 같이, 있는 품에 소금이라 간에 있을 청춘의 뼈 것이다. 동산에는 곳으로 피가 이상의 눈에 못할 구할 가장 사는가 그리하였는가? 속잎나고, 뼈 위하여 창공에 할지라도 우리의 대중을 것이다. 있음으로써 이 물방아 우는 따뜻한 인생에 황금시대다. 천고에 우리 이상의 청춘을 칼이다. 뛰노는 소담스러운 그들은 보라. 반짝이는 무엇이 이상이 실현에 이상, 것이다. 이상은 천자만홍이 우리 든 웅대한 품으며, 실로 힘차게 보내는 쓸쓸하랴? 소담스러운 옷을 그들의 작고 투명하되 그들은 이 있는가? 밝은 있으며, 뛰노는 천고에 청춘의 없으면 예수는 아름답고 있으랴? 대중을 가는 피고, 끓는 피다.
                                얼마나 인간의 같은 거선의 평화스러운 예수는 가치를 만물은 힘있다. 바이며, 공자는 작고 속에서 사람은 얼음에 아니다. 청춘 가는 있는 싶이 찾아 그들은 설산에서 그들은 되려니와, 부패뿐이다. 영원히 그들은 미묘한 듣기만 것이다. 우는 우리의 미묘한 인생의 같으며, 청춘에서만 것이다. 붙잡아 용감하고 천고에 보는 무엇을 이상의 것은 피다. 풀이 인생에 없으면, 찾아 긴지라 보배를 힘있다. 그러므로 가치를 그것은 있는가? 인생을 위하여서, 만천하의 가치를 풍부하게 그들의 인생에 같이, 듣는다. 그것은 우리 것은 기쁘며, 불어 속에서 이상 위하여서.
                            </td>
                        </tr> -->
                        <?php
                        $myBoardID = $_GET['myBoardID'];
                        
                        // echo $myBoardID;

                        $sql = "SELECT b.boardTitle, m.youName, b.regTime, b.boardView, b.boardContents FROM myBoard b JOIN myMember m ON(m.MymemberID = b.myMemberID) WHERE b.myBoardID = {$myBoardID}";
                        
                        
                        
                        // 보드뷰 + 1 (UPDATE 사용) 2022-10-04 숙제                        
                        $boardView = "UPDATE myBoard SET boardView = boardView + 1 WHERE myBoardID = {$myBoardID}";
                        $connect -> query($boardView);
                        
                        
                        $result = $connect -> query($sql);
                        

                        if($result){
                            $info = $result -> fetch_array(MYSQLI_ASSOC);

                            
                            

                            echo "<tr><th>제목</th><td>".$info['boardTitle']."</td>";
                            echo "</tr><th>등록자</th><td>".$info['youName']."</td></tr>";
                            echo "<tr><th>등록일</th><td>".date('Y-m-d', $info['regTime'])."</td></tr>";
                            echo "<th>조회수</th><td>".$info['boardView']."</td></tr>";
                            echo "</tr><th>내용</th><td class='height'>".$info['boardContents']."</td></tr>";

                            // echo "<pre>"
                            // var_dump($info);
                            // echo "</pre>";
                        }
                        ?>
                    </tbody>
                    
                    </table>                    
                </div>
                <div class="board__btn">
                    <a href="boardModify.php?myBoardID=<?=$myBoardID?>">수정하기</a>
                    <a href="boardRemove.php?myBoardID=<?=$myBoardID?>" onClick = "alert('정말 삭제하시겠습니까?')">삭제하기</a>
                    <a href="board.php">목록보기</a>
                </div>
            </div>
        </section>
    
</body>
    <?php include "../include/footer.php"?>
    <!-- footer -->
</html>