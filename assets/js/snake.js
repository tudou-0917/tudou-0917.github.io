// 贪吃蛇游戏
(function(){
    const canvas = document.getElementById('snake-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const grid = 20;
    const size = 16;
    let snake = [{x: 8, y: 8}];
    let direction = 'right';
    let food = {x: Math.floor(Math.random()*size), y: Math.floor(Math.random()*size)};
    let gameOver = false;
    let score = 0;
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        // 画蛇
        for (let i=0; i<snake.length; i++) {
            const s = snake[i];
            // 蛇头
            if (i===0) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(s.x*grid+grid/2, s.y*grid+grid/2, grid/2-1, 0, Math.PI*2);
                ctx.fillStyle = '#e02e24';
                ctx.shadowColor = '#ff6a00';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
                // 画眼睛
                ctx.save();
                ctx.beginPath();
                let eyeOffsetX = direction==='left'?-4:direction==='right'?4:0;
                let eyeOffsetY = direction==='up'?-4:direction==='down'?4:0;
                ctx.arc(s.x*grid+grid/2-4+eyeOffsetX, s.y*grid+grid/2-4+eyeOffsetY, 2, 0, Math.PI*2);
                ctx.arc(s.x*grid+grid/2+4+eyeOffsetX, s.y*grid+grid/2-4+eyeOffsetY, 2, 0, Math.PI*2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(s.x*grid+grid/2-4+eyeOffsetX, s.y*grid+grid/2-4+eyeOffsetY, 1, 0, Math.PI*2);
                ctx.arc(s.x*grid+grid/2+4+eyeOffsetX, s.y*grid+grid/2-4+eyeOffsetY, 1, 0, Math.PI*2);
                ctx.fillStyle = '#222';
                ctx.fill();
                ctx.restore();
            }
            // 蛇尾
            else if (i===snake.length-1) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(s.x*grid+grid/2, s.y*grid+grid/2, grid/2-5, 0, Math.PI*2);
                ctx.fillStyle = '#ffb366';
                ctx.shadowColor = '#ff6a00';
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.restore();
            }
            // 蛇身
            else {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = '#ff6a00';
                ctx.strokeStyle = '#fff0ef';
                ctx.lineWidth = 2;
                ctx.arc(s.x*grid+grid/2, s.y*grid+grid/2, grid/2-2, 0, Math.PI*2);
                ctx.shadowColor = '#ffb366';
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }
        }
        // 画食物
        ctx.save();
        ctx.beginPath();
        ctx.arc(food.x*grid+grid/2, food.y*grid+grid/2, grid/2-3, 0, Math.PI*2);
        ctx.fillStyle = '#00c853';
        ctx.shadowColor = '#00c853';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        // 画分数
        ctx.fillStyle = '#e02e24';
        ctx.font = '16px Arial';
        ctx.fillText('分数: '+score, 8, 20);
    }
    function move() {
        if (gameOver) return;
        let head = {...snake[0]};
        if (direction==='left') head.x--;
        if (direction==='right') head.x++;
        if (direction==='up') head.y--;
        if (direction==='down') head.y++;
        // 撞墙或撞自己
        if (head.x<0||head.x>=size||head.y<0||head.y>=size||snake.some(s=>s.x===head.x&&s.y===head.y)) {
            gameOver = true;
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '28px bold Arial';
            ctx.fillText('游戏结束', 90, 160);
            ctx.font = '18px Arial';
            ctx.fillText('分数: '+score, 120, 200);
            return;
        }
        snake.unshift(head);
        // 吃到食物
        if (head.x===food.x && head.y===food.y) {
            score++;
            food = {x: Math.floor(Math.random()*size), y: Math.floor(Math.random()*size)};
        } else {
            snake.pop();
        }
        draw();
    }
    document.addEventListener('keydown', function(e){
        if (e.key==='ArrowLeft' && direction!=='right') direction='left';
        if (e.key==='ArrowRight' && direction!=='left') direction='right';
        if (e.key==='ArrowUp' && direction!=='down') direction='up';
        if (e.key==='ArrowDown' && direction!=='up') direction='down';
    });
    draw();
    setInterval(move, 120);
})(); 