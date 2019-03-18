board=new Array(9);
for(x=0;x<9;x++){
  board[x]=new Array(9);
  for(y=0;y<9;y++){
    board[x][y]=new Array(9);
    for(z=0;z<9;z++){
      board[x][y][z]=true;
    }
  }
}

/**
 * Returns the solution to a Sudoku puzzle.
 *
 * @param {range} input the board.
 * @param {hints} show hints?
 * @return The solved puzzle.
 * @customfunction
 */
function SUDOKU(range,hints){
  for(x=0;x<9;x++){
    for(y=0;y<9;y++){
      for(z=0;z<9;z++){
        board[x][y][z]=true;
      }
    }
  }
  out=range;
  for(x=0;x<9;x++){
    for(y=0;y<9;y++){
      if(out[x][y]==""){
        continue;
      }
      put(range[x][y]-1,x,y);
      out[x][y]=range[x][y];
    }
  }
  
  brk=false;
  while(!brk){
    brk=true;
    for(x=0;x<9&&brk;x++){
      for(y=0;y<9&&brk;y++){
        if(out[x][y]>0){
          continue;
        }
        out[x][y]=0;
        for(z=0;z<9;z++){
          if(board[x][y][z]){
            out[x][y]--;
          }
        }
        if(out[x][y]===-1){
          for(z=0;z<9&&brk;z++){
            if(board[x][y][z]){
              brk=false;
              out[x][y]=z+1;
              put(z,x,y);
            }
          }
        }
      }
    }
    for(x=0;x<9&&brk;x++){
      for(y=0;y<9&&brk;y++){
        if(out[x][y]>0){
          continue;
        }
        out[x][y]=0;
        for(z=0;z<9&&brk;z++){
          if(check(z,x,y)){
            brk=false;
            out[x][y]=z+1;
            put(z,x,y);
          }
        }
      }
    }
    for(x=0;x<9&&brk;x++){
      for(y=0;y<9&&brk;y++){
        if(out[x][y]>0){
          continue;
        }
        if(!hints){
          out[x][y]="";
          continue;
        }
        out[x][y]=0;
        for(z=0;z<9&&brk;z++){
          if(board[x][y][z]){
            out[x][y]=out[x][y]*10+z+1;
          }
        }
      }
    }
  }
  return out;
}

function check(v,x,y){
  if(!board[x][y][v]){
    return false;
  }
  s=0;
  for(i=0;i<9;i++){
    if(board[x][i][v]){
      s++;
    }
  }
  if(s===1){
    return true;
  }
  s=0;
  for(i=0;i<9;i++){
    if(board[i][y][v]){
      s++;
    }
  }
  if(s===1){
    return true;
  }
  s=0;
  for(i=Math.floor(x/3+0.01)*3;i<Math.floor(x/3+1.01)*3;i++){
    for(j=Math.floor(y/3+0.01)*3;j<Math.floor(y/3+1.01)*3;j++){
      if(board[i][j][v]){
        s++;
      }
    }
  }
  if(s===1){
    return true;
  }
  return false;
}

function put(v,x,y){
  for(z=0;z<9;z++){
    board[x][z][v]=false;
  }
  for(z=0;z<9;z++){
    board[z][y][v]=false;
  }
  for(i=Math.floor(x/3+0.01)*3;i<Math.floor(x/3+1.01)*3;i++){
    for(j=Math.floor(y/3+0.01)*3;j<Math.floor(y/3+1.01)*3;j++){
      board[i][j][v]=false;
    }
  }
  for(z=0;z<9;z++){
    board[x][y][z]=false;
  }
  board[x][y][v]=true;
}