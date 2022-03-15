import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [draw, setDraw] = useState();
    

    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0,1,2],
                [3,4,5],
                [6,7,8],
            ],
            down: [
                [0,3,6],
                [1,4,7],
                [2,5,8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ]
        }
        for (let combo in combos){
            combos[combo].forEach((pattern) =>{
                // console.log(pattern);
                if(
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ){
                    //do nothing
                }else if(
                    squares[pattern[0]] === squares [pattern[1]] &&
                    squares[pattern[1]] === squares [pattern[2]]
                ){
                    setWinner(squares[pattern[0]]);
                }
            })
        }
    }
    
    const handleClick = (id) =>{
        if (cells[id] !== ''){
            return;
        }
        if(winner){
            return;
        }

        let squares = [...cells]
        console.log(id);
        if (turn === 'x'){
            squares[id] = 'x';
            setTurn('o');
        }else{
            squares[id] = 'o';
            setTurn('x');
        }
        checkForWinner(squares);
        setCells(squares);
        // console.log(squares)
        //remis
        if(squares[0] && squares[1] && squares[2] && squares[3] && squares[4] && squares[5] && squares[6] && squares[7] && squares[9] !== ''){
            console.log('wszystkie pola zajęte')
            if(!winner){
                setDraw('REMIS');
                console.log('remis')
            }
        }
    }
    const Cell = ({id})=>{
        return <td onClick={() => handleClick(id)}>{cells[id]}</td>
    }
    
    const handleRestart = () =>{
        setWinner(null);
        setDraw(null);
        setCells(Array(9).fill(''));
    }


    return (
      <div className='context'>
          <table>
              <tbody>
              <tr>
                  <Cell id={0}/>
                  <Cell id={1}/>
                  <Cell id={2}/>
              </tr>
              <tr>
                  <Cell id={3}/>
                  <Cell id={4}/>
                  <Cell id={5}/>
              </tr>
              <tr>
                  <Cell id={6}/>
                  <Cell id={7}/>
                  <Cell id={8}/>
              </tr>
              </tbody>
          </table>
            <p>
                {winner || draw ? '' : `Ruch: ${turn}`}
            </p>
          {winner && (
              <>
              <h2>Zwycięża {winner}!</h2>
              <button onClick={() => handleRestart()}>Zagraj jeszcze raz</button>
              </>
          )}
          {draw && (
              <>
              <h2>{draw}!</h2>
              <button onClick={() => handleRestart()}>Zagraj jeszcze raz</button>
              </>
          )}

      </div>
    )
  }


export default TicTacToe