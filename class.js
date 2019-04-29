class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.multiply = 0;
    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    spread() {
        this.multiply++;
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);

        if (newCellRand && this.multiply >= 3) {
            var newx = newCellRand[0];
            var newy = newCellRand[1];
            matrix[newy][newx] = 1;

            var newGrass = new Grass(newx, newy);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}
class grassEaterO {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 4;
        this.id = 0;
        this.spreadc = 2;
        this.spmultiply = 1;
    }
    getNewCoords() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getGrassid(x, y) {
        for (var i = 0; i < grassArr.length; i++)
            if (grassArr[i].x == x && grassArr[i].y == y)
                return i;
    }
    chooseCell(ch) {
        this.getNewCoords();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == Math.abs(ch)) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            matrix[this.y][this.x] = 2;
            this.energy--;
        }
    }

    spread() {
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);
        this.spmultiply++;
        if (newCellRand && this.energy > 5 && this.spmultiply % 2 == 0) {
            var newx = newCellRand[0];
            var newy = newCellRand[1];
            matrix[newy][newx] = 2;
            var newgrassEater = new grassEaterO(newx, newy);
            grassEaterArr.push(newgrassEater);
            this.energy = 3;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            grassEaterArr.splice(this.id, 1);
            this.energy = 0;
        }

    }
    eat() {
        var ecell = random(this.chooseCell(1));
        if (ecell) {
            matrix[this.y][this.x] = 0;
            grassArr.splice(this.getGrassid(ecell[0], ecell[1]), 1);
            this.x = ecell[0];
            this.y = ecell[1];
            matrix[ecell[1]][ecell[0]] = 2;
            this.energy++;
            return true;
        }
        else {
            return false;
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.id;
        this.energy = 40;
        this.decreaser = 0;
    }




    chooseCell(ch) {
        this.getNewCoords();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == Math.abs(ch)) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    getNewCoords() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getgrassEaterOid(x, y) {
        for (var i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                return i;
        }
    }
    getPonchoid(x,y)
    {
        for(var j = 0; j < ponchArr.length; j++)
            if(ponchArr[j].x == x && ponchArr[j].y == y)
            {
                return j;
            }
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            matrix[this.y][this.x] = 3;
            this.energy-=1;
        }
    }
    eat() {
        var eatcell = random(this.chooseCell(2));
        var poncheatcell = random(this.chooseCell(4));
        if (eatcell) {
                matrix[this.y][this.x] = 0;
                grassEaterArr.splice(this.getgrassEaterOid(eatcell[0], eatcell[1]), 1);
                this.x = eatcell[0];
                this.y = eatcell[1];
                matrix[eatcell[1]][eatcell[0]] = 3;
                this.energy+=3;
                return true;
        }
        else if(poncheatcell)
        {
            matrix[this.y][this.x] = 0;
            ponchArr.splice(this.getPonchoid(poncheatcell[0],poncheatcell[1]),1);
            this.x = poncheatcell[0];
            this.y = poncheatcell[1];
            matrix[poncheatcell[1]][poncheatcell[0]] = 3;
            this.energy+=3;
            return true;
        }
        else {
            return false;
        }
    }
    spread() {
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);
        this.decreaser++;
        if (newCellRand && this.energy > 50 && this.decreaser >= 3) {
            var newx = newCellRand[0];
            var newy = newCellRand[1];
            matrix[newy][newx] = 3;
            var newPred = new Predator(newx, newy);
            predArr.push(newPred);
            this.energy = 20;
            this.decreaser = 0;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            predArr.splice(this.id, 1);
            this.energy = 0;
        }
    }
}
class Poncho {
    constructor(x, y, jbool = false) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.energy = 10;
        this.spreaded = false;
        this.spreadtimer = 0;
        this.justborned = jbool;
        this.ptimer = 0;
        this.id;
    }
    getNewCoords() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getgrassEaterOid(x, y) {
        for (var i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                return i;
        }
    }
    getGrassid(x, y) {
        for (var i = 0; i < grassArr.length; i++)
            if (grassArr[i].x == x && grassArr[i].y == y)
                return i;
    }
    chooseCell(ch) {
        this.getNewCoords();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == Math.abs(ch)) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            matrix[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            matrix[this.y][this.x] = 4;
            this.energy--;
            return true;
        }
        else
            return false;
    }

    eat() {
        var newCellgrassEater = random(this.chooseCell(2));
        var newCellGrass = random(this.chooseCell(1));
        if (newCellgrassEater) {
            matrix[this.y][this.x] = 0;
            grassEaterArr.splice(this.getgrassEaterOid(newCellgrassEater[0], newCellgrassEater[1]), 1);
            this.x = newCellgrassEater[0];
            this.y = newCellgrassEater[1];
            matrix[newCellgrassEater[1]][newCellgrassEater[0]] = 4;
            this.energy++;

            return true;
        }
        else {
            if (newCellGrass) {
                matrix[this.y][this.x] = 0;
                grassArr.splice(this.getGrassid(newCellGrass[0], newCellGrass[1]), 1);
                this.x = newCellGrass[0];
                this.y = newCellGrass[1];
                matrix[newCellGrass[1]][newCellGrass[0]] = 4;
                this.energy++;

                return true;
            }
            return false;
        }
    }

    getAnotherPoncho(x, y) {
        var ponchtosp = random(this.chooseCell(4));
        if (ponchtosp) {
            x = ponchtosp[0];
            y = ponchtosp[1];
            for (var i = 0; i < ponchArr.length; i++)
            {
                if (ponchArr[i].x == x && ponchArr[i].y == y)
                {
                    if(ponchArr[i].spreaded == false)
                        return i;
                    else 
                        return -1;
                }
            }
                
        }
        else {
            return -1;
        }

    }
    spread() {
        var tarid = this.getAnotherPoncho();
        var emptycellstospread = random(this.chooseCell(0));
        if (tarid != -1 && this.spreaded == false && this.justborned == false && ponchArr.length < 300) {
            if (emptycellstospread) {
                this.spreaded = true;
                ponchArr[tarid].spreaded = true;
                var newx = emptycellstospread[0];
                var newy = emptycellstospread[1];
                matrix[newy][newx] = 4;
                var newponch = new Poncho(newx, newy, true);
                ponchArr.push(newponch);
                return true;
            }
            else
                return false;
        }
        else {
            return false;
        }
    }
    setMaxEn(){
        if(this.energy > 15)
            this.energy = 15;
    }
    backtocanspread()
    {
        if(this.spreaded == true)
        {
            this.spreadtimer++;
            if(this.spreadtimer > 50)
            {
                this.spreaded = false;
            }            
        }
        if(this.justborned == true)
        {
            this.ptimer++;
            if(this.ptimer > 30)
            {
                this.justborned = false;
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            ponchArr.splice(this.id, 1);
            this.energy = 0;
        }
    }
}
class God{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    paintArr(){
        matrix[this.y][this.x] = 5;
    }
    getNewCoords() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getGrassid(x, y) {
        for (var i = 0; i < grassArr.length; i++)
            if (grassArr[i].x == x && grassArr[i].y == y)
                return i;
    }
    getgrassEaterOid(x,y){
        for(var i = 0; i < grassEaterArr.length; i++)
            if(grassEaterArr[i].x == x && grassEaterArr[i].y == y)
                return i;
    }
    getPredatorid(x,y){
        for(var i = 0; i < predArr.length; i++)
            if(predArr[i].x == x && predArr[i].y == y)
                return i;
    }
    getPonchoid(x,y){
        for(var i = 0; i < ponchArr.length; i++)
            if(ponchArr[i].x == x && ponchArr[i].y == y)
                return i;
    }
    moveUp(){
        this.getNewCoords();
        if(this.y != 0)
        {
            matrix[this.y][this.x] = 0;
            var check = matrix[this.y-1][this.x];
            if(check == 1)
            {
                grassArr.splice(this.getGrassid(this.x,this.y-1), 1);   

            }
            else if(check == 2)
            {
                grassEaterArr.splice(this.getgrassEaterOid(this.x,this.y-1), 1);   
            }
            else if(check == 3)
            {
                predArr.splice(this.getPredatorid(this.x,this.y-1),1);

            }
            else if(check == 4)
            {
                ponchArr.splice(this.getPonchoid(this.x,this.y-1),1);

            }
            this.y -= 1;
            matrix[this.y][this.x] = 5;
            return true;
        } 
        return false;
    }
    moveDown(){
        this.getNewCoords();
        if(this.y != matrix.length-1)
        {
            matrix[this.y][this.x] = 0;
            var check = matrix[this.y+1][this.x];
            if(check == 1)
            {
                grassArr.splice(this.getGrassid(this.x,this.y+1), 1);   

            }
            else if(check == 2)
            {
                grassEaterArr.splice(this.getgrassEaterOid(this.x,this.y+1), 1);   
            }
            else if(check == 3)
            {
                predArr.splice(this.getPredatorid(this.x,this.y+1),1);

            }
            else if(check == 4)
            {
                ponchArr.splice(this.getPonchoid(this.x,this.y+1),1);

            }
            this.y += 1;
            matrix[this.y][this.x] = 5;
            return true;
        } 
        return false;
    }  
    moveLeft(){
        this.getNewCoords();
        if(this.x != 0)
        {
            matrix[this.y][this.x] = 0;
            var check = matrix[this.y][this.x-1];
            if(check == 1)
            {
                grassArr.splice(this.getGrassid(this.x-1,this.y), 1);   

            }
            else if(check == 2)
            {
                grassEaterArr.splice(this.getgrassEaterOid(this.x-1,this.y), 1);   
            }
            else if(check == 3)
            {
                predArr.splice(this.getPredatorid(this.x-1,this.y),1);

            }
            else if(check == 4)
            {
                ponchArr.splice(this.getPonchoid(this.x-1,this.y),1);

            }
            this.x -= 1;
            matrix[this.y][this.x] = 5;
            return true;
        } 
        return false;
    }  
    moveRight(){
        this.getNewCoords();
        if(this.x != matrix[0].length-1)
        {
            matrix[this.y][this.x] = 0;
            var check = matrix[this.y][this.x+1];
            if(check == 1)
            {
                grassArr.splice(this.getGrassid(this.x+1,this.y), 1);   

            }
            else if(check == 2)
            {
                grassEaterArr.splice(this.getgrassEaterOid(this.x+1,this.y), 1);   
            }
            else if(check == 3)
            {
                predArr.splice(this.getPredatorid(this.x+1,this.y),1);

            }
            else if(check == 4)
            {
                ponchArr.splice(this.getPonchoid(this.x+1,this.y),1);

            }
            this.x += 1;
            matrix[this.y][this.x] = 5;
            return true;
        
        }
        return false; 
    }

}