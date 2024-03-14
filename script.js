// modal output for recording moves
let modalOutput = document.getElementsByClassName('algorithm-modal')
let paraOutput = document.getElementById('modal-para')

// output for number of moves
let movesPara = document.getElementById('moves-para')
// input for generated scrambles
let scrambleEl = document.getElementById('scramble-input')

// face rotation buttons default rotation
let faceRotateBtns = document.querySelectorAll('.face-rotate-btn')
// face rotation buttons prime rotation
let faceRotatePrimeBtns = document.querySelectorAll('.face-rotate-prime-btn')
// cube rotation buttons default rotation
let cubeRotationBtns = document.querySelectorAll('.cube-rotate-btn')
// cube rotation buttons prime rotation
let cubeRotatePrimeBtns = document.querySelectorAll('.cube-rotate-prime-btn')
// buttons for double rotations
let doubleFaceRotationBtns = document.querySelectorAll('.face-double-rotate-btn')

  //  listener for buttons executing DEFAULT face rotations
  faceRotateBtns.forEach(button =>{
button.addEventListener('click', event =>{
  faceRotate(event.target.id)
})
})
  //  listener for buttons executing PRIME face rotations
  faceRotatePrimeBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    faceRotate(event.target.id)
  })
  })

  //  listener for buttons executing DEFAULT cube rotations
  cubeRotationBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    faceRotate(event.target.id)
  })
  })
  //  listener for buttons executing PRIME cube rotations
  cubeRotatePrimeBtns.forEach(button =>{
    button.addEventListener('click', event =>{
      faceRotate(event.target.id)
    })
    })

    doubleFaceRotationBtns.forEach(button =>{
      button.addEventListener('click', event =>{
        faceRotate(event.target.id, 'double')
      })
      })

 // face elements
let faceElements = document.querySelectorAll('.face-element')
faceElements.forEach(button =>{
  button.addEventListener('click', event =>{
  

  })
  })

  let cubeStateBtns = document.querySelectorAll('.cube-state-btn')

  // array to only alloqw characters that are  related to cube rotations, 
  let moveCharacters = [ 'U', 'D', 'L', 'R', 'B', 'F', '\'']
// preventing double appostrophes  - you could change the characters into a string and if two appostrophes are adjacent to each other then alert user of mistake.

// the following array, which represents the entire cube, sets out the faces in a way that is human readable.  Each subarray, which represents one face of the cube,  contains three subarrays, each of which represents the  layer of the cube, on which the row sits, as seen when looking directly at that face.  subarray[0]/[1]/[2] represent top, middle, bottom rows respectively (last, second and first layer respectively), and columns 1/2/3 represent L, M and R in cube notation (i.e. left, middle and right)
let cubeMatrixAlt = [

  [
    // UP
    ['y', 'y', 'y'],
    ['y', 'y', 'y'],
    ['y', 'y', 'y'],
  ], 

  // LEFT
  [
    ['g', 'g', 'g'],
    ['g', 'g', 'g'],
    ['g', 'g', 'g'],
  ],

  // FRONT
  [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
  ], 

  // RIGHT
  [
    ['b', 'b', 'b'],
    ['b', 'b', 'b'],
    ['b', 'b', 'b'],
  ],

  // BACK
  [
    ['r', 'r', 'r'],
    ['r', 'r', 'r'],
    ['r', 'r', 'r'],
  ], 

  // DOWN
  [
    ['w', 'w', 'w'],
    ['w', 'w', 'w'],
    ['w', 'w', 'w'],
  ], 
]

// cube in solved state for reset
const resetCube = [...cubeMatrixAlt]
// the below array will contain the configuration for the cube after face or cube rotation;
const newCube = []

// arrays containing edge pieces for down, middle and up layers (layers 1, 2 and 3)
/*
for the up and down layer array subarrays, the zero index element represents the edge facet that is on the 'end' of the layer.  The element at index '1' represents the edge facet that is on the 'side' of the layer

for the mid layer array, the zero index element represents the edge facet on the front or back end of the layer, and the element at index '1' represents the facet on the right or left 
*/
// records last layer edges
let upLayerEdges = []
// records mid layer edges
let midLayerEdges = []
// records first layer edges
let downLayerEdges = []
// records last layer corners
let upLayerCorners = []
// records firs layer corners
let downLayerCorners = []

// arrays to hold facets for each face
let leftFacetArr = []
let rightFacetArr = []
let frontFacetArr = []
let backFacetArr = []
let upFacetArr = []
let downFacetArr = []
// subarrays for holding facet elements for each face
let facetMainArr  = [leftFacetArr, rightFacetArr, frontFacetArr, backFacetArr, upFacetArr, downFacetArr]

// array for facet class names, each facet has a classname, a string, that includes a spelled out word representing its integer position on the face
const facetsNames = [
  ['zero', 'one', 'two'],
  ['three', 'four', 'five'],
  ['six', 'seven', 'eight']
]

// variables for determining the colour of the facet
let faceColour;
let colourName;

const renderCube = (cube, update, double, doubleFace) =>{
// console.log(cube)
// facetMainArr
// console.log(cube)

  const runRender = (newConfig) =>{

    // on the cube matrix array for each subarray (representing one layer of the cube)
cube.forEach((face, faceIndex) =>{
  // loop through the layer elements
  face.forEach((layer, indexOfLayer) =>{
  
    layer.forEach((facet, indexOfFacet) =>{
  // create a div for each element (which represents a facet on the layer)
  let facetElement = document.createElement('div')
  // create an appropriate classname for the facet, the string on the current position
  let facetClass = 'facet-' + facetsNames[indexOfLayer][indexOfFacet]
  // add facet's classname to the div
  facetElement.setAttribute('class', facetClass)
  
      // get colour character from cube matrix array which corresponds to face array
      faceColour = facet
  
      switch(faceColour){ // switch colour character and assign colour associated with character
        case 'g': colourName = 'green'
        break;
        case 'o': colourName = 'orange'
        break;
        case 'b': colourName = 'blue'
        break;
        case 'r': colourName = 'red'
        break;
        case 'y': colourName = 'yellow'
        break;
        case 'w': colourName = 'white'
        break;
          }
  
     // style the facet and add face colour
     facetElement.style.cssText = `width:50px; height:50px;  border:1px solid black; border-radius:5px; background-color:${colourName}`


     // push facet to face array, unless a new configuration exists then push to the empty array
if(newConfig){

  // first the original facets need removal
  faceElements.forEach(oldFace =>{
    while (oldFace.firstChild) {
      oldFace.removeChild(oldFace.firstChild)
    }
    
       })
    
  newConfig[faceIndex].push(facetElement)
  // on each face element
  faceElements.forEach((face, indexOfFace) =>{
    // find the corresponding group of facets
    newConfig[indexOfFace].forEach((facetMember, indexOfMember) =>{

      // append each facet to the face
      face.append(facetMember)
    })
    
  })

// replace original cube with new configuration
  cubeMatrixAlt = [...cube]

  // arrays recording edge pice positions
  upLayerEdges = [
    [cubeMatrixAlt[0][0][1], cubeMatrixAlt[4][0][1]],// UP-BACK
    [cubeMatrixAlt[0][1][0], cubeMatrixAlt[1][0][1]], // UP-LEFT
    [cubeMatrixAlt[0][2][1], cubeMatrixAlt[2][0][1]], // UP-FRONT
    [cubeMatrixAlt[0][1][2], cubeMatrixAlt[3][0][1]] // UP-RIGHT
  ]
  
  midLayerEdges = [

    [cubeMatrixAlt[4][1][2], cubeMatrixAlt[1][1][0]], // BACK-LEFT
    [cubeMatrixAlt[2][1][0], cubeMatrixAlt[1][1][2]], // FRONT-LEFT
    [cubeMatrixAlt[2][1][2], cubeMatrixAlt[3][1][0]], // FRONT-RIGHT
    [cubeMatrixAlt[4][1][0], cubeMatrixAlt[3][1][2]] // BACK-RIGHT
  ]
  
  downLayerEdges = [
    [cubeMatrixAlt[5][2][1], cubeMatrixAlt[4][2][1]], // DOWN-BACK
    [cubeMatrixAlt[5][1][0], cubeMatrixAlt[1][2][1]], // DOWN-LEFT
    [cubeMatrixAlt[5][0][1], cubeMatrixAlt[2][2][1]], // DOWN-FRONT
    [cubeMatrixAlt[5][1][2], cubeMatrixAlt[3][2][1]] // DOWN-RIGHT
  ]
 
upLayerCorners = [
  [cubeMatrixAlt[0][0][0], cubeMatrixAlt[4][0][2], cubeMatrixAlt[1][0][0]],// UP-BACK-LEFT
  [cubeMatrixAlt[0][2][0], cubeMatrixAlt[2][0][0], cubeMatrixAlt[1][0][2]], // UP-FRONT-LEFT
  [cubeMatrixAlt[0][2][2], cubeMatrixAlt[2][0][2], cubeMatrixAlt[3][0][0]], // UP-FRONT-RIGHT
  [cubeMatrixAlt[0][0][2], cubeMatrixAlt[4][0][0], cubeMatrixAlt[3][0][2]] // UP-BACK-RIGHT
]

downLayerCorners = [
  [cubeMatrixAlt[5][2][0], cubeMatrixAlt[4][2][2], cubeMatrixAlt[1][2][0]],// DOWN-BACK-LEFT
  [cubeMatrixAlt[5][0][0], cubeMatrixAlt[2][2][0], cubeMatrixAlt[1][2][2]], // DOWN-FRONT-LEFT
  [cubeMatrixAlt[5][0][2], cubeMatrixAlt[2][2][2], cubeMatrixAlt[3][2][0]], // DOWN-FRONT-RIGHT
  [cubeMatrixAlt[5][2][2], cubeMatrixAlt[4][2][0], cubeMatrixAlt[3][2][2]] // DOWN-BACK-RIGHT

]
}else{
  facetMainArr[faceIndex].push(facetElement)


// use facetMainArray elements to pupulate cube faces
  // on each face element
  faceElements.forEach((face, indexOfFace) =>{
    // find the corresponding group of facets
    facetMainArr[indexOfFace].forEach((facetMember, indexOfMember) =>{

      // append each facet to the face
      face.append(facetMember)
    })
    
  })

}

  
    })
  
    })
  
  })


  if(double == 'double'){
    switch(doubleFace){
      case 'up': 
      upRotate('u2-btnless')
      break;
      case 'down': 
      downRotate('d2-btnless')
      break;
      case 'left': 
      leftRotate('l2-btnless')
      break;
      case 'right': 
      rightRotate('r2-btnless')
      break;
      case 'front': 
      frontRotate('f2-btnless')
      break;
      case 'back': 
      backRotate('b2-btnless')
      break;
    
    }
      }

  }

// to render number of moves, get the text content from the moves output paragraph and convert to a number
  let lastMove = Number(movesPara.textContent)
if(double == 'double'){
  // when a double rotation is made, increase number by 0.5, so on the second move the number will increment by 1. 
lastMove + 0.5
}else{
// increment the value each time a non-double rotation is made
  lastMove ++
movesPara.textContent = lastMove
}




  // if this is not the first render then the update argument will have the string value 'update'
  if(update){
setTimeout(() => {
  newArray = [[], [], [], [], [], []]
  runRender(newArray)
}, 50);


  }else{
runRender()
  }





  
}
// when page opens up the cube is rendered in the solved configuration
renderCube(cubeMatrixAlt)


// function for dealing with face turns
function faceRotate(button, double){
switch(button){
case 'u-btn':
case 'u-prime-btn':
  case 'u2-btn':
  upRotate(button, double)
break;
case 'd-btn':
case 'd-prime-btn':
  case 'd2-btn':
  downRotate(button, double)
break;
case 'l-btn':
case 'l-prime-btn':
  case 'l2-btn':
  leftRotate(button, double)
break;
case 'r-btn':
case 'r-prime-btn':
  case 'r2-btn':
  rightRotate(button, double)
break;
case 'f-btn':
case 'f-prime-btn':
  case 'f2-btn':
  frontRotate(button, double)
break;
case 'b-btn':
case 'b-prime-btn':
  case 'b2-btn':
  backRotate(button, double)
break;
}
}



// U or U' move
function upRotate(button, double){

switch(button){
  case 'u-btn': // execute default move - 
  // left, front, right and back have last layer, row 1 rotated. 
  // row 'A' receives row'B' facets - left recieves back, front receives left, right receives front, and back receives right; // everything on the turned face needs to be changed (aside from center piece which is at index position '4')
case 'u2-btn': // request for a double face rotation i.e 'U2'
case 'u2-btnless':
let newUp = [

  [cubeMatrixAlt[0][2][0], cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][0][0]], 
  [cubeMatrixAlt[0][2][1], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][0][1]], 
  [cubeMatrixAlt[0][2][2], cubeMatrixAlt[0][1][2], cubeMatrixAlt[0][0][2]]


]


let  newLeft = [
  cubeMatrixAlt[2][0],
  cubeMatrixAlt[1][1],
  cubeMatrixAlt[1][2]
]

let  newFront = [
  cubeMatrixAlt[3][0],
  cubeMatrixAlt[2][1],
  cubeMatrixAlt[2][2]
]

let  newRight = [
  cubeMatrixAlt[4][0],
  cubeMatrixAlt[3][1],
  cubeMatrixAlt[3][2]
]


let  newBack = [
  cubeMatrixAlt[1][0],
  cubeMatrixAlt[4][1],
  cubeMatrixAlt[4][2]
]


let newConfig = [
newUp,
newLeft,
newFront, 
newRight, 
newBack, 
cubeMatrixAlt[5]
]
// if double rotation button pressed use relevant double rotation output
// button == 'u-btn'? paraOutput.textContent += ' U - ': paraOutput.textContent += ' U2 - ';
// if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only

if(button == 'u-btn'){paraOutput.textContent += ' U - '}
if(button == 'u2-btn'){paraOutput.textContent += ' U2 - '}

double == 'double'? renderCube(newConfig, 'update', double, 'up'): renderCube(newConfig, 'update')
break;

    case 'u-prime-btn': // execute prime move
    let newUpPrime = [


      [cubeMatrixAlt[0][0][2], cubeMatrixAlt[0][1][2], cubeMatrixAlt[0][2][2]], 
      [cubeMatrixAlt[0][0][1], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][2][1]], 
      [cubeMatrixAlt[0][0][0], cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][2][0]]
    
    ]
    
    
    let newLeftPrime = [
      cubeMatrixAlt[4][0],
      cubeMatrixAlt[1][1],
      cubeMatrixAlt[1][2]
    ]
    
    let newFrontPrime = [
      cubeMatrixAlt[1][0],
      cubeMatrixAlt[2][1],
      cubeMatrixAlt[2][2]
    ]
    
    let newRightPrime = [
      cubeMatrixAlt[2][0],
      cubeMatrixAlt[3][1],
      cubeMatrixAlt[3][2]
    ]
    
    
    let newBackPrime = [
      cubeMatrixAlt[3][0],
      cubeMatrixAlt[4][1],
      cubeMatrixAlt[4][2]
    ]
    
    
    let newConfigPrime = [
    newUpPrime,
    newLeftPrime,
    newFrontPrime, 
    newRightPrime, 
    newBackPrime, 
    cubeMatrixAlt[5]
    ]
    paraOutput.textContent += ' U\' - '

    renderCube(newConfigPrime, 'update')
    
break;
}
}


// D or D' move
function downRotate(button, double){


  switch(button){
      case 'd-btn': // down default
      case 'd2-btn':
        case 'd2-btnless':

      let newLeft = [
        cubeMatrixAlt[1][0],
        cubeMatrixAlt[1][1],
        cubeMatrixAlt[4][2]
      ]
      
      let newFront = [
        cubeMatrixAlt[2][0],
        cubeMatrixAlt[2][1],
        cubeMatrixAlt[1][2]
      ]
      
      let newRight = [
        cubeMatrixAlt[3][0],
        cubeMatrixAlt[3][1],
        cubeMatrixAlt[2][2]
      ]
      
      
      let newBack = [
        cubeMatrixAlt[4][0],
        cubeMatrixAlt[4][1],
        cubeMatrixAlt[3][2]
      ]
      
      let newDown = [
        [cubeMatrixAlt[5][2][0], cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][0][0]], 
        [cubeMatrixAlt[5][2][1], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][0][1]], 
        [cubeMatrixAlt[5][2][2], cubeMatrixAlt[5][1][2], cubeMatrixAlt[5][0][2]]
      
      ]
      
      let newConfig = [
      cubeMatrixAlt[0],
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
      ]

      // shortcut to render output to match rotation type
      // button == 'd-btn'? paraOutput.textContent += ' D - ': paraOutput.textContent += ' D2 - '
// if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only

if(button == 'd-btn'){paraOutput.textContent += ' D - '}
if(button == 'd2-btn'){paraOutput.textContent += ' D2 - '}

double == 'double'? renderCube(newConfig, 'update', double, 'down'): renderCube(newConfig, 'update')
break;

    case 'd-prime-btn': // down prime

    let newLeftPrime = [
      cubeMatrixAlt[1][0],
      cubeMatrixAlt[1][1],
      cubeMatrixAlt[2][2]
    ]
    
    let newFrontPrime = [
      cubeMatrixAlt[2][0],
      cubeMatrixAlt[2][1],
      cubeMatrixAlt[3][2]
    ]
    
    let newRightPrime = [
      cubeMatrixAlt[3][0],
      cubeMatrixAlt[3][1],
      cubeMatrixAlt[4][2]
    ]
    
    
    let newBackPrime = [
      cubeMatrixAlt[4][0],
      cubeMatrixAlt[4][1],
      cubeMatrixAlt[1][2]
    ]
    
    let newDownPrime = [
      [cubeMatrixAlt[5][0][2], cubeMatrixAlt[5][1][2], cubeMatrixAlt[5][2][2]], 
      [cubeMatrixAlt[5][0][1], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][2][1]], 
      [cubeMatrixAlt[5][0][0], cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][2][0]]
    
    ]
    
    let newConfigPrime = [
    cubeMatrixAlt[0],
    newLeftPrime,
    newFrontPrime, 
    newRightPrime, 
    newBackPrime, 
    newDownPrime

    ]
    paraOutput.textContent += ' D\' - '

    renderCube(newConfigPrime, 'update')
    break;
  }
}


// L or L' move
function leftRotate(button, double){
 

  switch(button){
    case 'l-btn':
      case 'l2-btn':
        case 'l2-btnless':

    let newUp = [
      [cubeMatrixAlt[4][2][2], cubeMatrixAlt[0][0][1], cubeMatrixAlt[0][0][2]], 
      [cubeMatrixAlt[4][1][2], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][1][2]], 
      [cubeMatrixAlt[4][0][2], cubeMatrixAlt[0][2][1], cubeMatrixAlt[0][2][2]]
     ]


      let newLeft = [
        [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][0][0]], 
        [cubeMatrixAlt[1][2][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][0][1]], 
        [cubeMatrixAlt[1][2][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][0][2]]
      ]

      let newFront = [
  [cubeMatrixAlt[0][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[2][0][2]], 
  [cubeMatrixAlt[0][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][1][2]], 
  [cubeMatrixAlt[0][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[2][2][2]]
       ]
      
// right remains unchanged
      let newRight = cubeMatrixAlt[3]
      
      
      let newBack = [
        [cubeMatrixAlt[4][0][0], cubeMatrixAlt[4][0][1], cubeMatrixAlt[5][2][0]], 
        [cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][1][1], cubeMatrixAlt[5][1][0]], 
        [cubeMatrixAlt[4][2][0], cubeMatrixAlt[4][2][1], cubeMatrixAlt[5][0][0]]
      ]
      
      let newDown = [
        [cubeMatrixAlt[2][0][0], cubeMatrixAlt[5][0][1], cubeMatrixAlt[5][0][2]], 
        [cubeMatrixAlt[2][1][0], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][1][2]], 
        [cubeMatrixAlt[2][2][0], cubeMatrixAlt[5][2][1], cubeMatrixAlt[5][2][2]]
      
      ]


      
      let newConfig = [
      newUp,
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
  
      ]
      // shortcut to render output to match rotation type
      // button == 'l-btn'? paraOutput.textContent += ' L - ': paraOutput.textContent += ' L2 - '

      if(button == 'l-btn'){paraOutput.textContent += ' L - '}
if(button == 'l2-btn'){paraOutput.textContent += ' L2 - '}


// if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'left'): renderCube(newConfig, 'update')
      break;
 case 'l-prime-btn':
  
 let newUpPrime = [
  [cubeMatrixAlt[2][0][0], cubeMatrixAlt[0][0][1], cubeMatrixAlt[0][0][2]], 
  [cubeMatrixAlt[2][1][0], cubeMatrixAlt[0][1][1], cubeMatrixAlt[0][1][2]], 
  [cubeMatrixAlt[2][2][0], cubeMatrixAlt[0][2][1], cubeMatrixAlt[0][2][2]]
 ]

// left remains unchanged
  let newLeftPrime = [
    [cubeMatrixAlt[1][0][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][2][2]], 
    [cubeMatrixAlt[1][0][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][2][1]], 
    [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][2][0]]
  ]

  let newFrontPrime = [
[cubeMatrixAlt[5][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[2][0][2]], 
[cubeMatrixAlt[5][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][1][2]], 
[cubeMatrixAlt[5][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[2][2][2]]
  ]
  
  // right face remains unchanged
  let newRightPrime = cubeMatrixAlt[3]
  
  
  let newBackPrime = [
    [cubeMatrixAlt[4][0][0], cubeMatrixAlt[4][0][1], cubeMatrixAlt[0][2][0]], 
    [cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][1][1], cubeMatrixAlt[0][1][0]], 
    [cubeMatrixAlt[4][2][0], cubeMatrixAlt[4][2][1], cubeMatrixAlt[0][0][0]]
  ]
  
  let newDownPrime = [
    [cubeMatrixAlt[4][2][2], cubeMatrixAlt[5][0][1], cubeMatrixAlt[5][0][2]], 
    [cubeMatrixAlt[4][1][2], cubeMatrixAlt[5][1][1], cubeMatrixAlt[5][1][2]], 
    [cubeMatrixAlt[4][0][2], cubeMatrixAlt[5][2][1], cubeMatrixAlt[5][2][2]]
  
  ]


  
  let newConfigPrime = [
  newUpPrime,
  newLeftPrime,
  newFrontPrime, 
  newRightPrime, 
  newBackPrime, 
  newDownPrime

  ]
  paraOutput.textContent += ' L\' - '


  renderCube(newConfigPrime, 'update')
}
}


// R or R' move
function rightRotate(button, double){


  switch(button){
      case 'r-btn':
        case 'r2-btn':
          case 'r2-btnless':

      let newUp = [
        [cubeMatrixAlt[0][0][0], cubeMatrixAlt[0][0][1], cubeMatrixAlt[2][0][2]], 
        [cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][1][1], cubeMatrixAlt[2][1][2]], 
        [cubeMatrixAlt[0][2][0], cubeMatrixAlt[0][2][1], cubeMatrixAlt[2][2][2]]
       ]

// left remains unchanged
        let newLeft = cubeMatrixAlt[1]

        let newFront = [
    [cubeMatrixAlt[2][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[5][0][2]], 
    [cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[5][1][2]], 
    [cubeMatrixAlt[2][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[5][2][2]]
        ]
        
        let newRight = [
  [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][0][0]], 
  [cubeMatrixAlt[3][2][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][0][1]], 
  [cubeMatrixAlt[3][2][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][0][2]]

        ]
        
        
        let newBack = [
          [cubeMatrixAlt[0][2][2], cubeMatrixAlt[4][0][1], cubeMatrixAlt[4][0][2]], 
          [cubeMatrixAlt[0][1][2], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][1][2]], 
          [cubeMatrixAlt[0][0][2], cubeMatrixAlt[4][2][1], cubeMatrixAlt[4][2][2]]
        ]
        
        let newDown = [
          [cubeMatrixAlt[5][0][0], cubeMatrixAlt[5][0][1], cubeMatrixAlt[4][2][0]], 
          [cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][1][1], cubeMatrixAlt[4][1][0]], 
          [cubeMatrixAlt[5][2][0], cubeMatrixAlt[5][2][1], cubeMatrixAlt[4][0][0]]
        
        ]


        
        let newConfig = [
        newUp,
        newLeft,
        newFront, 
        newRight, 
        newBack, 
        newDown
    
        ]
      // shortcut to render output to match rotation type
      if(button == 'r-btn'){paraOutput.textContent += ' R - '}
if(button == 'r2-btn'){paraOutput.textContent += ' R2 - '}
        // if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'right'): renderCube(newConfig, 'update')

        break;
   case 'r-prime-btn':
    
   let newUpPrime = [
    [cubeMatrixAlt[0][0][0], cubeMatrixAlt[0][0][1], cubeMatrixAlt[4][2][0]], 
    [cubeMatrixAlt[0][1][0], cubeMatrixAlt[0][1][1], cubeMatrixAlt[4][1][0]], 
    [cubeMatrixAlt[0][2][0], cubeMatrixAlt[0][2][1], cubeMatrixAlt[4][0][0]]
   ]

// left remains unchanged
    let newLeftPrime = cubeMatrixAlt[1]

    let newFrontPrime = [
[cubeMatrixAlt[2][0][0], cubeMatrixAlt[2][0][1], cubeMatrixAlt[0][0][2]], 
[cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][1][1], cubeMatrixAlt[0][1][2]], 
[cubeMatrixAlt[2][2][0], cubeMatrixAlt[2][2][1], cubeMatrixAlt[0][2][2]]
    ]
    
    let newRightPrime = [
      [cubeMatrixAlt[3][0][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][2][2]], 
      [cubeMatrixAlt[3][0][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][2][1]], 
      [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][2][0]]

    ]
    
    
    let newBackPrime = [
      [cubeMatrixAlt[5][2][2], cubeMatrixAlt[4][0][1], cubeMatrixAlt[4][0][2]], 
      [cubeMatrixAlt[5][1][2], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][1][2]], 
      [cubeMatrixAlt[5][0][2], cubeMatrixAlt[4][2][1], cubeMatrixAlt[4][2][2]]
    ]
    
    let newDownPrime = [
      [cubeMatrixAlt[5][0][0], cubeMatrixAlt[5][0][1], cubeMatrixAlt[2][0][2]], 
      [cubeMatrixAlt[5][1][0], cubeMatrixAlt[5][1][1], cubeMatrixAlt[2][1][2]], 
      [cubeMatrixAlt[5][2][0], cubeMatrixAlt[5][2][1], cubeMatrixAlt[2][2][2]]
    
    ]


    
    let newConfigPrime = [
    newUpPrime,
    newLeftPrime,
    newFrontPrime, 
    newRightPrime, 
    newBackPrime, 
    newDownPrime

    ]
    paraOutput.textContent += ' R\' - '

    renderCube(newConfigPrime, 'update')
}
}


// F or F' move
function frontRotate(button, double){


  switch(button){
    case 'f-btn':
      case 'f2-btn':
case 'f2-btnless':
    let  newUp = [
      cubeMatrixAlt[0][0],
      cubeMatrixAlt[0][1],
      [cubeMatrixAlt[1][2][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][0][2]]
    ]
    
    let  newDown = [
      [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][0][0]],
      cubeMatrixAlt[5][1],
      cubeMatrixAlt[5][2]
    ]

    let newRight = [
      [cubeMatrixAlt[0][2][0], cubeMatrixAlt[3][0][1], cubeMatrixAlt[3][0][2]], 
      [cubeMatrixAlt[0][2][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][1][2]], 
      [cubeMatrixAlt[0][2][2], cubeMatrixAlt[3][2][1], cubeMatrixAlt[3][2][2]]
    ]

      let newLeft = [
        [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][0][1], cubeMatrixAlt[5][0][0]], 
        [cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][1][1], cubeMatrixAlt[5][0][1]], 
        [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][2][1], cubeMatrixAlt[5][0][2]]
      ]

      let newFront = [
        [cubeMatrixAlt[2][2][0], cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][0][0]], 
        [cubeMatrixAlt[2][2][1], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][0][1]], 
        [cubeMatrixAlt[2][2][2], cubeMatrixAlt[2][1][2], cubeMatrixAlt[2][0][2]]
       ]
      
// back remains unchanged
  let newBack = cubeMatrixAlt[4]
      



      
      let newConfig = [
      newUp,
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
  
      ]
      // shortcut to render output to match rotation type
      if(button == 'f-btn'){paraOutput.textContent += ' F - '}
      if(button == 'f2-btn'){paraOutput.textContent += ' F2 - '}      // if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'front'): renderCube(newConfig, 'update')

      break;
 case 'f-prime-btn':
  
 let newUpPrime = [
  cubeMatrixAlt[0][0],
  cubeMatrixAlt[0][1],
  [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][2][0]]

 ]

// left remains unchanged
  let newLeftPrime = [
    [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][0][1], cubeMatrixAlt[0][2][2]], 
    [cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][1][1], cubeMatrixAlt[0][2][1]], 
    [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][2][1], cubeMatrixAlt[0][2][0]]
  ]

  let newFrontPrime = [
    [cubeMatrixAlt[2][0][2], cubeMatrixAlt[2][1][2], cubeMatrixAlt[2][2][2]], 
    [cubeMatrixAlt[2][0][1], cubeMatrixAlt[2][1][1], cubeMatrixAlt[2][2][1]], 
    [cubeMatrixAlt[2][0][0], cubeMatrixAlt[2][1][0], cubeMatrixAlt[2][2][0]]
  ]
  
  let newRightPrime = [
    [cubeMatrixAlt[5][0][2], cubeMatrixAlt[3][0][1], cubeMatrixAlt[3][0][2]], 
    [cubeMatrixAlt[5][0][1], cubeMatrixAlt[3][1][1], cubeMatrixAlt[3][1][2]], 
    [cubeMatrixAlt[5][0][0], cubeMatrixAlt[3][2][1], cubeMatrixAlt[3][2][2]]
  ]
  
// back remains unchanged
let newBackPrime = cubeMatrixAlt[4]

  let newDownPrime = [
    [cubeMatrixAlt[1][0][2], cubeMatrixAlt[1][1][2], cubeMatrixAlt[1][2][2]],
    cubeMatrixAlt[5][1],
    cubeMatrixAlt[5][2]
  
  ]


  
  let newConfigPrime = [
  newUpPrime,
  newLeftPrime,
  newFrontPrime, 
  newRightPrime, 
  newBackPrime, 
  newDownPrime

  ]
  paraOutput.textContent += ' F\' - '

  renderCube(newConfigPrime, 'update')
}
}


// B or B' move
function backRotate(button, double){
  

  switch(button){
    case 'b-btn':
      case 'b2-btn':
case 'b2-btnless':
    let  newUp = [
      [cubeMatrixAlt[3][0][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][2][2]],
      cubeMatrixAlt[0][1],
      cubeMatrixAlt[0][2],

    ]
    
    let  newDown = [
      cubeMatrixAlt[5][0],
      cubeMatrixAlt[5][1],
      [cubeMatrixAlt[1][0][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][2][0]]
    ]

    let newRight = [
      [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][0][1], cubeMatrixAlt[5][2][2]], 
      [cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][1][1], cubeMatrixAlt[5][2][1]], 
      [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][2][1], cubeMatrixAlt[5][2][0]]
    ]

      let newLeft = [
        [cubeMatrixAlt[0][0][2], cubeMatrixAlt[1][0][1], cubeMatrixAlt[1][0][2]], 
        [cubeMatrixAlt[0][0][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][1][2]], 
        [cubeMatrixAlt[0][0][0], cubeMatrixAlt[1][2][1], cubeMatrixAlt[1][2][2]]
      ]

      let newBack = [
        [cubeMatrixAlt[4][2][0], cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][0][0]], 
        [cubeMatrixAlt[4][2][1], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][0][1]], 
        [cubeMatrixAlt[4][2][2], cubeMatrixAlt[4][1][2], cubeMatrixAlt[4][0][2]]
      ]
// front remains unchanged
      let newFront = cubeMatrixAlt[2]

      
      let newConfig = [
      newUp,
      newLeft,
      newFront, 
      newRight, 
      newBack, 
      newDown
  
      ]
      // shortcut to render output to match rotation type
      if(button == 'b-btn'){paraOutput.textContent += ' B - '}
      if(button == 'b2-btn'){paraOutput.textContent += ' B2 - '}
      // if a double rotate button is clicked, add the double argument as a third parameter, use default parameters only
double == 'double'? renderCube(newConfig, 'update', double, 'back'): renderCube(newConfig, 'update')

      break;
 case 'b-prime-btn':
  
 let newUpPrime = [
  [cubeMatrixAlt[1][2][0], cubeMatrixAlt[1][1][0], cubeMatrixAlt[1][0][0]],
  cubeMatrixAlt[0][1],
  cubeMatrixAlt[0][2]
 ]


  let newLeftPrime = [
    [cubeMatrixAlt[5][2][0], cubeMatrixAlt[1][0][1], cubeMatrixAlt[1][0][2]], 
    [cubeMatrixAlt[5][2][1], cubeMatrixAlt[1][1][1], cubeMatrixAlt[1][1][2]], 
    [cubeMatrixAlt[5][2][2], cubeMatrixAlt[1][2][1], cubeMatrixAlt[1][2][2]]
  ]
  // front remains unchanged
  let newFrontPrime = [...cubeMatrixAlt[2]]

  let newRightPrime = [
    [cubeMatrixAlt[3][0][0], cubeMatrixAlt[3][0][1], cubeMatrixAlt[0][0][0]], 
    [cubeMatrixAlt[3][1][0], cubeMatrixAlt[3][1][1], cubeMatrixAlt[0][0][1]], 
    [cubeMatrixAlt[3][2][0], cubeMatrixAlt[3][2][1], cubeMatrixAlt[0][0][2]]
  ]
  

let newBackPrime = [
  [cubeMatrixAlt[4][0][2], cubeMatrixAlt[4][1][2], cubeMatrixAlt[4][2][2]], 
  [cubeMatrixAlt[4][0][1], cubeMatrixAlt[4][1][1], cubeMatrixAlt[4][2][1]], 
  [cubeMatrixAlt[4][0][0], cubeMatrixAlt[4][1][0], cubeMatrixAlt[4][2][0]]
]

  let newDownPrime = [

    cubeMatrixAlt[5][0],
    cubeMatrixAlt[5][1],
    [cubeMatrixAlt[3][2][2], cubeMatrixAlt[3][1][2], cubeMatrixAlt[3][0][2]]
  
  ]


  
  let newConfigPrime = [
  newUpPrime,
  newLeftPrime,
  newFrontPrime, 
  newRightPrime, 
  newBackPrime, 
  newDownPrime

  ]


  paraOutput.textContent += ' B\' - '

  renderCube(newConfigPrime, 'update')
}}


const changeCubeState = (clickedButton) =>{
  let stateButton = clickedButton
  
  switch(stateButton){
    case 'scramble': console.log('scrambling cube.....')
    break;
    case 'solve': console.log('solving cube...')
    // reset the number of moves in the output so you can see the number of moves it takes to solve 
    if(downLayerEdges.length > 0){
      movesPara.textContent = 0;
      checkCrossDownLayer()
    }else{
      alert('cube not scrambled: no moves executed yet; scramble cube before solving')
    }

    break;
    default: // reset button was clicked
    paraOutput.textContent = ''
    renderCube(resetCube, 'update')

  }
}

// CUBE STATE BUTTONS EVENT LISTENER
cubeStateBtns.forEach(button =>{
  button.addEventListener('click', e =>{
    changeCubeState(e.target.id)
})
  })

  // function to input scramles.  Will not allow manual input, since there is too much room for error; so will continue to use button elements for moving the cube manually which will probably not be needed eventually.  

  // maybe disallow letters that are not 'L R U D B F' and their primes 


  //temporary arrays to hold correctly (and incorrectly) oriented cross pieces on the first layer
  let orientedCrossEdgeArray = []
let notOrientedCrossEdgeArray = []
 // array for index of incorrectly permuted cross piece when all cross pieces are on the down layer, but one of them is incorrectly permuted; 
let incorrectlyOrientedPieceArray = []


// DOWN LAYER CHECK FOR CROSS PIECES
  function checkCrossDownLayer(){
    console.log('checking down layer for cross pieces...')
        // loop through the array and take the current index, target index and orientation boolean value and push as an object to the array; the array name will be permutationArray. 
        let permutationsArray = []
    // clear the arrays containing oriented cross edges
    orientedCrossEdgeArray = []
    // clear the array containing incorrectly permuted cross edges
    notOrientedCrossEdgeArray = []
   // for non-cross piece edges in the down layer
   let absentCrossPiecesArray = []
 // for cross pieces that are on the down layer but not correctly oriented
    let notOrientedCrossPieceArray = []
// variables for correctly number of oriented cross pieces on the down layer
      let orientedCrossPieces = 0;
// variable for the string name of the position of the cross piece edge
let crossPiecePosition; 

          
    // check if there are any correctly oriented white cross pieces on the bottom layer
    downLayerEdges.forEach((edge, index) =>{

console.log('showing edge piece')
console.log(edge)
      // check the index position of the edge and assign the corresponding 'string name' of the position to the crossPiecePosition variable. 
      if(index === 0){
        crossPiecePosition = 'down-back'
      }else if(index === 1){
        crossPiecePosition = 'down-left'
      }else if(index === 2){
        crossPiecePosition = 'down-front'
      }else{
        crossPiecePosition = 'down-right'
                }

    
      // below three conditions check whether there is a white facet on the edge piece or not, and if there is one, whether it is correctly oriented or not. 

      // if the value at the first index in the edge subarray is 'w'
      if(edge[0] == 'w'){// the edge is a cross piece and is correctly oriented

        // increment the oriented pieces variable
orientedCrossPieces ++;

// CREATE AN OBJECT FOR THE ORIENTED CROSS PIECE DETIALS
orientedCrossEdgeArray.push({
  'index_in_layer': index,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition,
  'oriented':true
})

  }else if(edge[1] =='w'){ // otherwise if the value at the last index of the subarray is 'w'
        
        // then the edge is an incorrectly oriented cross piece

        // CREATE AN OBJECT FOR THE INCORRECTLY ORIENTED CROSS PIECE DETIALS
notOrientedCrossPieceArray.push({
  'index_in_layer': index,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition,
  'oriented': false
})  

    }else if(edge[0] !== 'w' && edge[1] !== 'w'){
// otherwise neither index of the edge subarray has the value 'w'; the piece is not a cross piece since both facets of the edge are non-white.  

// CREATE AN OBJECT FOR THE NON-CROSS EDGE PIECE
absentCrossPiecesArray.push({
  'index_in_layer': index,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition
})

console.log(absentCrossPiecesArray)
      }
    }
    
    
    )

// variable for the number of edge pieces on the down layer that do not are not part of the cross
let fullyUnsolvedCrossPieces = absentCrossPiecesArray.length
    if(fullyUnsolvedCrossPieces < 4){ // if there are less than four fully unsolved cross pieces on the down layer, then at least one of the edges is a cross piece so the piece can be solved or pieces can be permuted relative to each other if more than one piece exists

      if(orientedCrossPieces > 0){
        switch(orientedCrossPieces){
          case 1: // since only one piece is oriented correctly, leave it as it is, since the next piece will be permuted relative to the one cross piece. 
          console.log('only one correctly oriented piece in the first layer, so does not need to be permuted.')
          checkCrossPieceMidLayer()
          break;
          case 2: // if two cross pieces are correctly oriented
  
        // GET master cross piece side colour
          let masterColor = orientedCrossEdgeArray[0]['cross_piece'][1]
        // GET SIDE-COLOR OF SECOND CROSS PIECE
          let color2 = orientedCrossEdgeArray[1]['cross_piece'][1]
          // get in-layer index of first piece
          let masterIndex = orientedCrossEdgeArray[0]['index_in_layer'];
          // get in-layer index of second piece
          let color2Index = orientedCrossEdgeArray[1]['index_in_layer'];
          // get the name of the second edge piece; the edge name will be sent as a parameter to the  permute function, which will switch the name in order to determine which side-face to turn in order to manipulate the piece
          let edgeName = orientedCrossEdgeArray[1]['piece_position']
          // the below IF/ELSE condition can be significantly reduced in size by noting that, the only parameter that changes in the permuteTwoCrossEdges() function is the integer parameter, which gives the number of rotations from colour1 to the correctly permuted index for colour2.  So a variable can be created for the for the number of rotations to permutation of colour2, updated when it meets a specific condition and then that variable can ber passed as a parameter to the function.  This will require only 'one' instance of the execution of the function
          
          let downRotations = -1 // using minus one just as a dummy number to be updated in the below condition
  
  if(masterColor  == 'o'){ // master is ORANGE
  // DETERMINE SECOND PIECE COLOUR
  if(color2 == 'g'){ // colour 2 is 'GREEN'
    downRotations = 3 // green is three clockwise rotations away from orange
  }else if(color2 == 'r'){ // colour is RED 
    downRotations = 2 // red is two clockwise rotations away from orange
  }else{ // the remaining colour is be BLUE
    downRotations = 1 // blue is one rotation away from orange
            }
  }else if(masterColor == 'b'){ // colour is BLUE
    // DETERMINE SECOND PIECE COLOUR
    if(color2 == 'o'){ // colour 2 is 'ORANGE'
    downRotations = 3 // 'o' is 3 rotations away from 'b'
    }else if(color2 == 'g'){ 
      downRotations = 2 // 'g' is 3 rotations away from 'b'
    }else{ // the remaining colour must be RED
      downRotations = 1
    }
  }else if(masterColor == 'r'){ // colour is RED
    // DETERMINE SECOND PIECE COLOUR
    if(color2 == 'b'){ // colour 2 is 'BLUE'
    downRotations = 3
    }else if(color2 == 'o'){ // colour is ORANGE 
      downRotations = 2
    }else{ // the remaining colour must be GREEN
      downRotations = 1
    }
  }else{// colour must be GREEN
    // DETERMINE SECOND PIECE COLOUR
    if(color2 == 'r'){ // colour 2 is 'RED'
    downRotations = 3
    }else if(color2 == 'b'){ // colour is BLUE 
      downRotations = 2
    }else{ // the remaining colour must be ORANGE
      downRotations = 1
    }
  }
  // execute function to  permute two oriented cross pieces on the down layer,  
  permuteTwoCrossEdges(masterIndex, color2Index, downRotations, edgeName)
  break;
  case 3:
    // clear permutations array for new down layer confuguration
  permutationsArray = []
    console.log('three oriented cross pieces on the down layer')
    // two scenarios for 3 oriented pieces on the down layer. 1) four cross pieces are in the down layer with one piece incorrectly oriented, and, 2) fourth piece is a non-cross piece. 
    if(notOrientedCrossPieceArray.length > 0){
      // there must be 'one' object in the array, representing an incorrectly oriented cross piece on the down layer. The below array will hold current index and permuted index for all four cross edge-pieces. 
  
      // create the new array which holds all of the objects representing edge pieces (cross pieces or not) on the down array
      let downLayerAllEdgesArr = [...orientedCrossEdgeArray, ...notOrientedCrossPieceArray]
  
      downLayerAllEdgesArr.forEach(edgePiece =>{
        // variable for non-white facet of cross edge-piece
      let colorFacet;
        // variable for the index at which the piece naturally sits in the down layer
    let naturalIndex; 
        if(edgePiece['oriented'] === true){
          colorFacet = edgePiece['cross_piece'][1]
          if(colorFacet == 'o'){
            naturalIndex = 2
          }else if(colorFacet == 'g'){
            naturalIndex = 1
          }else if(colorFacet == 'r'){
            naturalIndex = 0
          }else{
            naturalIndex = 3
          }
          permutationsArray.push(
            {
              'current_index':edgePiece['index_in_layer'],
              'natural_index': naturalIndex,
              'oriented': true
          }
          )
        }else{ // oriented isn't true so the colorFacet variable takes the first element of the index subarray as its value
          colorFacet = edgePiece['cross_piece'][0]
          if(colorFacet == 'o'){
            naturalIndex = 2
          }else if(colorFacet == 'g'){
            naturalIndex = 1
          }else if(colorFacet == 'r'){
            naturalIndex = 0
          }else{
            naturalIndex = 3
          }
          permutationsArray.push(
            {
              'current_index':edgePiece['index_in_layer'],
              'natural_index': naturalIndex,
              'oriented': false
          })
        }
  
  
      })
      
  
  
      
  // from here the array can be sent as parameter to the function for adjusting the down layer in order to use the zero index to permute the all four pieces.  Even the incorrectly oriented pieces can be permuted because that will ensure that the peice, although incorrectly oriented, will be on the down layer, and from there the function to search for incorrectly oriented cross pieces can run and that individual piece will be solved, resulting in the completion of the cross. 
  permuteFourCrossEdges(permutationsArray)
    }else{
      // there there are exactly three cross pieces on the down layer and one non-cross piece.
      
      // variable for sum of 'natural' indexes of the the cross pieces found on the down layer
  let sumOfNaturalIndexes = 0;
  // variable for natural index of missing piece
  let missingPieceNaturalIndex;
  
  // variable for current index of missing piece (we need to know where the piece sits to be able to permute all pieces)
  let dummyPieceCurrentIndex;
  
  // to get the value for the above we need to find the sum of current indexes of all the pieces on the down layer and then subtract that number from '6' which will give us the index of the dummy pieice
  let sumOfCurrentIndexes = 0;
  
      orientedCrossEdgeArray.forEach(edgePiece =>{
  console.log(edgePiece['index_in_layer'])
        sumOfCurrentIndexes += edgePiece['index_in_layer']
              // variable for non-white facet of cross edge-piece
      let colorFacet;
      // variable for the index at which the piece naturally sits in the down layer
  let naturalIndex; 
        colorFacet = edgePiece['cross_piece'][1]
        if(colorFacet == 'o'){
          naturalIndex = 2
          sumOfNaturalIndexes += 2
        }else if(colorFacet == 'g'){
          naturalIndex = 1
          sumOfNaturalIndexes += 1
        }else if(colorFacet == 'r'){
          naturalIndex = 0
          sumOfNaturalIndexes += 0
        }else{
          naturalIndex = 3
          sumOfNaturalIndexes += 3
        }
        permutationsArray.push(
          {
            'current_index':edgePiece['index_in_layer'],
            'natural_index': naturalIndex,
            'oriented': true
        }
        )
      
  
      })
  
  // at this stage there are only 3 cross pieces on the down layer, but they can be oriented as though they were four, but letting the non-cross piece act as a dummy for the missing cross piece, which can then be found and inserted later on. 
  
  // the missing piece can easily befound by calculating the sum of the indexes of the existung pieces, and subtracting the result from '6', which is the sum of indexes if all pieces were on the down layer. 
  console.log('sumOfNaturalIndexes')
  console.log(sumOfNaturalIndexes)
  
  console.log('sum of current indexes')
  console.log(sumOfCurrentIndexes)
  
  missingPieceNaturalIndex = 6 - sumOfNaturalIndexes
  
  console.log('missingPieceNaturalIndex')
  console.log(missingPieceNaturalIndex)
  
  dummyPieceCurrentIndex = 6 - sumOfCurrentIndexes
  
  console.log('dummyPieceCurrentIndex')
  console.log(dummyPieceCurrentIndex)
  
  // now create an object for the dummy piece with the same properties as the oriented cross pieces
  permutationsArray.push(
    {
      'current_index':dummyPieceCurrentIndex,
      'natural_index': missingPieceNaturalIndex,
      'oriented': null
  }
  )
  
  
    // execute permute function for four oriented cross pieces
    console.log(permutationsArray)
    permuteFourCrossEdges(permutationsArray)
  
    }
    break;
    case 4: // four cross pieces are correctly oriented
    // clear permutations array for new down layer confuguration
    permutationsArray = []
    console.log('four oriented cross pieces on the down layer')
    orientedCrossEdgeArray.forEach(edgePiece =>{
  // variable for color facet in order to determine the natural index of the piece
      let colorFacet;
      // variable for the index at which the piece naturally sits in the down layer
  let naturalIndex; 
        colorFacet = edgePiece['cross_piece'][1]
        if(colorFacet == 'o'){
          naturalIndex = 2
        }else if(colorFacet == 'g'){
          naturalIndex = 1
        }else if(colorFacet == 'r'){
          naturalIndex = 0
        }else{ // color facet is 'b'
          naturalIndex = 3
        }
        permutationsArray.push(
          {
            'current_index':edgePiece['index_in_layer'],
            'natural_index': naturalIndex,
            'oriented': true
        }
        )
      
    })
  
    console.log('permutations array')
    console.log(permutationsArray)
  
    // execute permute function for four oriented cross pieces
    permuteFourCrossEdges(permutationsArray)
      break;
  I   
      }
      }else{
        // there must still be at least one cross piece on the down layer, incorrectly oriented so execute the function which checks for those pieces  - this cannot occur if the fully unsolved pieces number is four (because, obviously there are not cross pieces on the down layer)
        checkNonOrientedCrossPieces()
      }


}else{
  // absentCrossPiecesArray contains 4 elements so no correctly or incorrectly oriented cross pieces exist on the down layer because both facets of all four down layer edges are non white
  console.log(fullyUnsolvedCrossPieces)
  console.log('no cross pieces were found on the first layer')
    checkCrossPieceMidLayer()

}
}

let solvedLayer1Cubies = []
let solvedLayer2Cubies = []

function handleFullCross(){
// four cross pieces are correctly oriented
    // clear permutations array for new down layer confuguration
    permutationsArray = []
    console.log('four oriented cross pieces on the down layer')
    orientedCrossEdgeArray.forEach(edgePiece =>{
  // variable for color facet in order to determine the natural index of the piece
      let colorFacet;
      // variable for the index at which the piece naturally sits in the down layer
  let naturalIndex; 
        colorFacet = edgePiece['cross_piece'][1]
        if(colorFacet == 'o'){
          naturalIndex = 2
        }else if(colorFacet == 'g'){
          naturalIndex = 1
        }else if(colorFacet == 'r'){
          naturalIndex = 0
        }else{ // color facet is 'b'
          naturalIndex = 3
        }
        permutationsArray.push(
          {
            'current_index':edgePiece['index_in_layer'],
            'natural_index': naturalIndex,
            'oriented': true
        }
        )
      
    })
  
    console.log('permutations array')
    console.log(permutationsArray)
  
    // execute permute function for four oriented cross pieces
    permuteFourCrossEdges(permutationsArray)

}

// PERMUTE FOUR EDGES (also applicable if one edge is incorrectly oriented and the rest are correctly oriented)
function permuteFourCrossEdges(array){
  incorrectlyOrientedPieceArray = [] // clear any elements in the array holding indexes of incorrectly oriented cross pieces, for the scenario where all cross pieces are on the down layer. 
  // the array 
  console.log('permutations array')
 console.log(array)

 // this array holds the permutation of the cross pieces as a combination, i.e. the index positions at which they sit, relative to the zero index position
let unsolvedPermutationArray = []


let stringPermutation;
 // loop through the array, and given that it each element is an object detailing the edge piece at each of the four indexes referencing the side faces of the cube, irrespective of orientation, find the object that has a 'natural' index of 'zero'.  Check how far it is from the natural index and use that information to rotate the down layer to so that the zero-index piece (which is the red piece) sits at the permuted position.  From there, the collective permutation positions of all pieces can be used to fix pieces incorrectly permuted. 

 // this variable is used to rotate the cube so that the cross piece that naturally sits at the zero index (the cross piece that sits on the red face when permuted) is placed at the its natural position, i.e. zero index.  the integer value assinged this variable will be used to rotate the down layer, and also to rewrite the post rotation index positions of the other cross pieces
let rotationsTocalibration
 array.forEach(crossObject =>{

  // get the natral index of the cross object
 let naturalIndex = crossObject['natural_index']
 // get the current index of the cross object
 let currentindex = crossObject['current_index']

 // if the piece is not correctly oriented, push its index to the array created to hold a single incorrectly oriented piece when all cross pieces are on the down layer -  the array can be checked after all pieces have been permuted. 
if(crossObject['oriented'] === false){
incorrectlyOrientedPieceArray.push(crossObject['natural_index'] )  

}


  if(naturalIndex === 0){ // if the natural index of the cross object  under examination is zero

    if(currentindex !== 0){// if the current index is not zero; the piece with a natural index of zero is not sitting at index zero
      // the down layer needs to rotate to the calibration so the piece that naturally sits at zero, is actually sitting at position zero.  From there the permutation of the other pieces can be compared to the permutation cases which dictate how the cube is manipulated to rearrange the cross pieces so they all sit at their natural indexes. 

      // get the difference between the natural index of the piece and the index of the position it is currently sitting at - this gives how much the down layer needs to rotate to reach calibration
      let rawRotation = naturalIndex - currentindex
      // if the rawRotation value is negative, the piece is in front (by clockwise rotation) of its natural index position.  Adding 4 to the negative value will give the number of forward rotations needed for the piece to reach its natural index
      if(rawRotation < 0){
        rotationsTocalibration = rawRotation + 4
      }else{ // otherwise the value is positive use that for the number of rotations
        rotationsTocalibration = rawRotation
      }




    }else{ // current index of the piece which naturally sits at zero must be zero,  so the down layer is already at calibration and does not need to rotate
rotationsTocalibration = 0
    }

  }else{
    // only the piece with a natural index of zero is needed to figure out how many rotations are required for calibration. 
  }
 })


// now (if rotations are required) apply the rotations to the current position values of the objects referencing the cross pieces
if(rotationsTocalibration > 0){
  console.log('how many rotations')
  console.log(rotationsTocalibration)

  // rotate the down layer so that the cross piece with natural index of zero is sitting at its natual index
  switch(rotationsTocalibration){
    case 1: downRotate('d-btn')
      break;
      case 2: downRotate('d2-btnless', 'double')
        break;
        case 3: downRotate('d-prime-btn')
          break
  }
  array.forEach(object =>{
    // update the index of the current object to reflect the cross piece position after down layer is rotated to calibration
object['current_index'] = (object['current_index'] + rotationsTocalibration)%4

let permutationPosition = object['current_index']
// each index position on the unsolved permutation array represents one of the side-face indexes of the cube; once calibration of the down layer occurs,  if a cross piece is sitting in the wrong position, then its natural index will be different from the index position it is sitting at. This is reflected in the array by assigning the natural index of the cross piece to the position in the array that corresponds to the side-face index that the piece is sitting at. For example; if the piece sitting at the firht face, which has index '2' is the blue piece, whose natural index is '3', then unsolvedPermutationArray[2] = 3, because the piece sitting at index two on the cube should be sitting at index 3.  Only when all pieces are solved does the natural index of each piece match the index of the side face it sits at; so this will give  unsolvedPermutationArray[0] = 0,  unsolvedPermutationArray[1] = 1, etc. In other words, for 0 <= i <= 3,  unsolvedPermutationArray[i] = i.  By creating a string out of the elements in the array for the scenario where all pieces sit at their natural index, we get the string '0123'. I have called this the 'identity' permutation; where nothing needs to be done to the cross pieces, since they are already permuted correctly.  There are five other arrangements that can occur, for a total of six permutations including the identity permutation.  Each of the other five permutations is solved with a specific set of moves on the cube and a switch statement is used to identify the permutation and to call the appropriate function to execute those moves. 
unsolvedPermutationArray[permutationPosition] = object['natural_index']
  })

  console.log(unsolvedPermutationArray)
  //create a string out of the joined elements of the unsolved permutation array; other than the identity permutation '0123' which occurs when all cross pieces are positioned at their natural index, there are 5 permutations that can occur.  The below swwitch statement examins the permutation and evokes the function that will rearrange the pieces to have the identity permutation. 
  stringPermutation = unsolvedPermutationArray.join('').toString()
  console.log('stringPermutation')
  console.log(stringPermutation)
  
  // execute function which solves permutation
  fullCrossPermutations(stringPermutation)

}else{
  // the down layer is already in the calibration position, but this doesn't mean that the cross is correctly permuted, just that the zero piece is in the correct position: other pieces that are incorrectly permuted will need fixing. 
  console.log('no rotations required')
  // on each object in the array
  array.forEach(object =>{
// note the cross object's current index
    let permutationPosition = object['current_index']
// place the natural index value of the object at the index position (in the array) corresponding to the cube's side-face index where the piece currently sits
    unsolvedPermutationArray[permutationPosition] = object['natural_index']
  })
// create the string permutation which represents how the cross pieces are arranged on the down layer
  stringPermutation = unsolvedPermutationArray.join('').toString()
  // show the permutation
  console.log('stringPermutation')
  console.log(stringPermutation)

    // execute function which checks the permutation and solves it, if required. 
  fullCrossPermutations(stringPermutation)
}
console.log(array)





}

// PERMUTE TWO CROSS PIECES
function permuteTwoCrossEdges(A, B, permuteDistance, edge_name){
  
  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permuted = (A + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of B
  let rotationsToPermuted;
  // variable for absolute rotations to correct permuted position of B; this value is used to turn the D-layer to the correct position for insertion of the cross piece from the U-layer

  
  let rawRotation;
  if(B === permuted){
    console.log('piece B is correctly permuted')
   // as there are only correctly oriented pieces in the D-layer and they are solved, check for cross pieces on the mid layer. 


   if(orientedCrossEdgeArray.length < 4){
    checkCrossPieceMidLayer()
  }else{
    // handle cross
    handleFullCross()
  }
  }else{ // piece B is not permuted correctly relative to piece A: find the distance between the correct permutation position and position of 'B'
rawRotation = permuted - B
console.log('piece B is not correctly permuted')

// if the rotation direction is negative value
if(rawRotation < 0){
//adding 4 to a negative number of rotations gives the required number of forward rotations
  rotationsToPermuted = rawRotation + 4
}else if(rawRotation > 0){ // otherwise the rotation direction is positive
  console.log('piece B is behind its correctly permuted position')
  // otherwise the number of rotations is positive; use the raw rotation value
  rotationsToPermuted = rawRotation
}

// switch the number of rotations to permuted so the down layer can receive the correct number of turns to receive the second piece
// the down layer is timed to occur between the two 'side-face' turns; because the down layer receives the cross piece, it is a given that this is the layer we are turning. On the other hand, the side-face needs to be determined because it could be any one of the four faces vertical faces on the cube. 

setTimeout(() => {
  switch(rotationsToPermuted){
    case 1: // just one forward rotation so just the d-btn string
         downRotate('d-btn')
    break;
    case 2:// a double rotation
        downRotate('d2-btnless', 'double')
    break;
    case 3: // three rotations can be achieved by doing one prime rotation of the same face
        downRotate('d-prime-btn')
    break;
    }
}, 3200);


// switch edge_name parameter to determine which edge needs to be rotated. 
switch(edge_name){
  case 'down-right': //  double rotate the right face
// first move
  setTimeout(() => {
    rightRotate('r2-btnless', 'double')
  }, 1600);
// third move
  setTimeout(() => {
    rightRotate('r2-btnless', 'double')
  }, 4800);

  // check result
  setTimeout(() => {

    if(orientedCrossEdgeArray.length < 4){
      checkCrossPieceMidLayer()
    }else{
      // handle cross
      handleFullCross()
    }
  }, 5200);
    break;
    case 'down-left': // double rotate the left face
// timeout for first move
    setTimeout(() => {
      leftRotate('l2-btnless', 'double')
    }, 1600);
// timeout for third move
    setTimeout(() => {
      leftRotate('l2-btnless', 'double')
    }, 4800);
  
  

    // check result
    setTimeout(() => { // recreate the array containing oriented cross pieces on the down layer so that the contents can be used later if there are non oriented cross pieces on the layer or if there are cross pieces on other layers. 
      updateLayer1CrossEdges()
      if(orientedCrossEdgeArray.length < 4){
        checkCrossPieceMidLayer()
      }else{
        // handle cross
        handleFullCross()
      }
    }, 5200);
      break;
      case 'down-front': // PIECE IS ON FRONT FACE
      // first move
      setTimeout(() => {
        frontRotate('f2-btnless', 'double')
      }, 1600);
// third move
   setTimeout(() => {
    frontRotate('f2-btnless', 'double')
   }, 4800);


   // check result
   setTimeout(() => {
    updateLayer1CrossEdges()
    if(orientedCrossEdgeArray.length < 4){
      checkCrossPieceMidLayer()
    }else{
      // handle cross
      handleFullCross()
    }
  }, 5200);
        break;
        case 'down-back': // double rotate the back face
// first smove
        setTimeout(() => {
          backRotate('b2-btnless', 'double')          
        }, 1600);
// third move
        setTimeout(() => {
          backRotate('b2-btnless', 'double')       
        }, 4800);


        // check result
setTimeout(() => {
  updateLayer1CrossEdges()
  if(orientedCrossEdgeArray.length < 4){
    checkCrossPieceMidLayer()
  }else{
    // handle cross
    handleFullCross()
  }
}, 5200);
          break;
}


  }

}




function checkResult(){

}

function checkNonOrientedCrossPieces(){
  console.log('checking for first layer cross pieces oriented incorrectly')
  // clear the array for a new representation of unoriented cross edges
notOrientedCrossEdgeArray = []
  let notOrientedCrossPieces = 0;

    // check for incorrectly oriented cross pieces on the first layer
    downLayerEdges.forEach((edge, index) =>{
      if(edge[1] == 'w'){
        // if either of the edge's facets is white incriment the cross pieces
  notOrientedCrossPieces ++;
  notOrientedCrossEdgeArray.push({
  'index_in_layer': index,
  'cross_piece': edge,
  })
      }
    });


    // if the pieces do exist
    if(notOrientedCrossPieces > 0){
      console.log('incorrectly oriented pieces exist on the down layer')
      let childIndex = notOrientedCrossEdgeArray[0]['index_in_layer']
console.log(` there are ${notOrientedCrossPieces} incorrectly oriented cross pieces in layer 1`)
console.log(notOrientedCrossEdgeArray)

// if there are oriented cross pieces on the first layer
if(orientedCrossEdgeArray.length > 0){

// when there are cross pieces already on the down layer, there needs to be an extra step to  undo the d-prime move that enabled the insertion of the cross piece from the mid layer.  This will ensure that if the cross was already permuted, but just  one cross piece was incorrectly oriented, when that piece is oriented, D-rotation to undo the D-prime move will set the down layer to the calibration position, which will put the cross into the solved position. 

switch(childIndex){
  case 0: // white facet is on back face
  setTimeout(() => {
    backRotate('b-btn')
  }, 1000);
  setTimeout(() => {
    downRotate('d-prime-btn')
  }, 2000);
  setTimeout(() => {
    rightRotate('r-btn')
  }, 3000);
      // undo d-prime move
      setTimeout(() => {
        downRotate('d-btn')
      }, 4000);
    break;

    case 1: // white facet is on left face
    setTimeout(() => {
      leftRotate('l-btn')
    }, 1000);
    setTimeout(() => {
      downRotate('d-prime-btn')
    }, 2000);
    setTimeout(() => {
      backRotate('b-btn')
    }, 3000);
    // undo d-prime move
    setTimeout(() => {
      downRotate('d-btn')
    }, 4000);
      break;

      case 2: // white facet is on front face
      setTimeout(() => {
    frontRotate('f-btn')
      }, 1000);
      setTimeout(() => {
        downRotate('d-prime-btn')
      }, 2000);
      setTimeout(() => {
        leftRotate('l-btn')
      }, 3000);
          // undo d-prime move
    setTimeout(() => {
      downRotate('d-btn')
    }, 4000);
        break;
        default: // otherwise white facet is on right face
        setTimeout(() => {
    rightRotate('r-btn')
        }, 1000);
        setTimeout(() => {
          downRotate('d-prime-btn')
        }, 2000);
        setTimeout(() => {
          frontRotate('f-btn')
        }, 3000);
            // undo d-prime move
    setTimeout(() => {
      downRotate('d-btn')
    }, 4000);
      
  }
  // move on to mid layer and do not check for secondary incorrectly oriented cross pieces; that can be done later
  setTimeout(() => {
    updateLayer1CrossEdges()
              if(orientedCrossEdgeArray.length < 4){
                console.log(orientedCrossEdgeArray.length)
                checkCrossPieceMidLayer()
              }else{
                // handle cross
                handleFullCross()
              }
  }, 5000);


}else{ // the piece can be inserted without consideration for disturbing other pieces
  // use the index to determine the face the white facet sits on, and then rotate relevant faces to get the piece into the first layer oriented correctly - permutation can be checked afterward (if the array containing cross piece objects has entries), if necessary. 

switch(childIndex){
  case 0: // white facet is on back face
  setTimeout(() => {
    backRotate('b-btn')
  }, 1000);
  setTimeout(() => {
    downRotate('d-prime-btn')
  }, 2000);
  setTimeout(() => {
    rightRotate('r-btn')
  }, 3000);
    break;
    case 1: // white facet is on left face
    setTimeout(() => {
      leftRotate('l-btn')
    }, 1000);
    setTimeout(() => {
      downRotate('d-prime-btn')
    }, 2000);
    setTimeout(() => {
      backRotate('b-btn')
    }, 3000);
      break;
      case 2: // white facet is on front face
      setTimeout(() => {
    frontRotate('f-btn')
      }, 1000);
      setTimeout(() => {
        downRotate('d-prime-btn')
      }, 2000);
      setTimeout(() => {
        leftRotate('l-btn')
      }, 3000);
        break;
        default: // otherwise white facet is on right face
        setTimeout(() => {
    rightRotate('r-btn')
        }, 1000);
        setTimeout(() => {
          downRotate('d-prime-btn')
        }, 2000);
        setTimeout(() => {
          frontRotate('f-btn')
        }, 3000);
      
  }
  // move on to mid layer and do not check for secondary incorrectly oriented cross pieces; that can be done later
setTimeout(() => {
  updateLayer1CrossEdges()
            if(orientedCrossEdgeArray.length < 4){
              console.log(orientedCrossEdgeArray.length)
              checkCrossPieceMidLayer()
            }else{
              // handle cross
              handleFullCross()
            }
}, 4000);
}
    }else{

      console.log('there are no incorrectly oriented cross pieces in layer 1: checking middle layer for cross pieces....')
updateLayer1CrossEdges()
            if(orientedCrossEdgeArray.length < 4){
              console.log(orientedCrossEdgeArray.length)
              checkCrossPieceMidLayer()
            }else{
              console.log(orientedCrossEdgeArray.length)
              // the cross is fully oriented to handle the cross
              handleFullCross()
            
            }
    }

}

function updateLayer1CrossEdges(){

  // clear the array containing the former
  orientedCrossEdgeArray = []
  let orientedCrossPieces = 0;
    // check if there are any correctly oriented white cross pieces on the bottom layer
    downLayerEdges.forEach((edge, index) =>{
   
      if(edge[0] == 'w'){
        // increment the oriented pieces variable
orientedCrossPieces ++;

          // index position of subarray referencing the piece is used to name the position of the cross piece
          if(index === 0){
            crossPiecePosition = 'down-back'
          }else if(index === 1){
            crossPiecePosition = 'down-left'
          }else if(index === 2){
            crossPiecePosition = 'down-front'
          }else{
            crossPiecePosition = 'down-right'
          }


// create an object properties of; index of rotation of the pice, the details of the cross piece edges, and the position of rotation in words. 
orientedCrossEdgeArray.push({
  'index_in_layer': index,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition
})
      }
    })
}


// array for cross edges on middle layer
let midLayerCrossEdgesArray = []


// PLACING CROSS PIECES FROM THE MID LAYER TO THE DOWN LAYER (PERMUTED)
function checkCrossPieceMidLayer(){
  // first make sure the array containing cross edge pieces details is updated - not sure if this is necessary. 
  updateLayer1CrossEdges()
  // ARRAY FOR CROSS PIECES FOUND ON THE MID LAYER
midLayerCrossEdgesArray = []
// variable for the number of cross pieces ON THE MID LAYER
let crossPieces = 0;
// variable for the name of the vertical edge where the cross piece sits; four of these, back-left, front-left, front-right and back-right.  an array is used and first word is first array element and second word is second array element, for ecample [back, right]
let crossPiecePosition; 

// VARIABLE FOR  index of the white piece in the cross_piece array
let edgePieceWhiteFacetIndex;
// variable for holding the indexes (in an array) of white and non-white cross piece facets; THE INDEX REFERS TO THE INDEX OF THE FACE THAT THE FACET SITS ON; for example a blue/white cross piece on the midde layer back left vertical edge with the white facet on the back and its blue facet on the left will have the following facetIndexes array values [0,1], because the back index is '0' and left is '1'.  The crossPiecePosition array for the same cross piece will be ['back', left], and the edge array, which contains references to the facet colors will read [w,b].  The index refers to the vertical edge where BL = 0, FL = 1, FR = 2, and BR = 3. One of the facet indexes will match the vertical edge index because that index matches one of the faces that the corner is part of; for example, the zero indexed vertical edge stradles back and left faces -  the zero index is the back face. Another example is the vertical edge with the index 2. That is the vertical edge that stradles the front and right faces; the front face is at index position '2'. So, the vertical edge gets its index from one of the faces that it stradles.  
let facetIndexes;
      // check if there are any white cross pieces on the mid layer
      midLayerEdges.forEach((edge, index) =>{
    


        if( edge[0] == 'w'|| edge[1] == 'w'){
          // if either of the edge's facets is white increment the cross pieces variable
          crossPieces ++;

                    // if/else condition on the index of the vertical edge. If the cross piece is found at the index, then it takes the names of the face the vertical edge stradles as two elements in an array (crossPiecePosition), and then takes the indexes of those two faces as two elements of another array (facetIndexes)

                    if(index === 0){ // back-left edge
                      crossPiecePosition = ['back', 'left']
                      facetIndexes = [0, 1] // back index, left index etc. 
                    }else if(index === 1){ // front-left edge 
                      crossPiecePosition = ['front', 'left'] // front index and left index... etc
                      facetIndexes = [2, 1]
                    }else if(index === 2){
                      crossPiecePosition = ['front', 'right']
                      facetIndexes = [2, 3]
                    }else{
                      crossPiecePosition = ['back', 'right']
                      facetIndexes = [0, 3]
                    }


// store all cross edge details in an object and push to array holding recorded mid layer cross pieces

  midLayerCrossEdgesArray.push({
    'index': index,
    'facet_indexes': facetIndexes,
    'cross_piece': edge, 
    'piece_position':crossPiecePosition
  })
        }
      })
// if there is at least one cross edge piece on the middle layer
      if(crossPieces > 0){
        console.log(`cross pieces on middle layer: ${crossPieces}`)

        // whether or not there are oriented cross pieces on the down layer, we still need to insert the cross piece into the first layer so this can stay outside of the condition for finding oriented cross pieces on the down layer. 

// get the first recorded cross piece object
        let childCrossEdge = midLayerCrossEdgesArray[0]
// variable for colour of non-white facet
let childColor;
// variable for index of colour facet
let childIndex;

// the value of the whiteFacetFace variable, gives the face on which the white facet is sitting. This string value (which can be back, left, front or right) is used to determine which face to turn depending on which vertical edge the cross piece sits on.  Example: if the cross piece sits on back/left, and whiteFacetFace = BACK, then L' will insert the cross piece correctly oriented into the first layer.  If  whiteFacetFace = BACK, but the cross piece sits on back/right, then, then R will insert the cross piece into the first layer, correctly oriented.   If on the other hand, for the latter example, whiteFaceFacet = RIGHT, then B' will correctly insert the cross piece in the down layer. 
let whiteFacetFace;
// get the vertical edge index that the cross piece sits on. 
let vertical_edge_index = childCrossEdge['index']
// determine colour and index of non-white facet of the cross piece
if(childCrossEdge['cross_piece'][0] == 'w'){ // cross_piece is the pair of facet colours found in the 'edge' array. Each element of the array can hold either one of the two colours. if the first edge color is white; 

  whiteFacetFace = childCrossEdge['piece_position'][0] // piece_position is an array of length '2', which holds the names of the faces that make up the vertical edge; for example, back left. The value at of the first element is always back or front, and the value at the last element of the two is always left or right. ALSO NOTE: the first element of the 'edge' array, corresponds to the first element of the crossPiecePosition array, corresponds to the first element in the facetIndexes array.  Same applies for the second element of those arrays, which are the values given the object properties, cross_piece, piece_position and facet_indexes, respectively


  console.log(`white facet is on "${whiteFacetFace}" face`), // should read back or front face; the index of the cross piece  facet color maps to the index of the piece position. So a color at cross_piece[0] will be sitting on the face found at piece_position[0], which will be the front or back face of the vertical edge. 
// set edge piece white facet index

  // since childCrossEdge['cross_piece'][0] = 'w', then the color must be at index '1' of cross_piece
  childColor = childCrossEdge['cross_piece'][1]
  // child index gives you the face to be rotated, because the index of white will be at index '0' and you don't want to rotate that because that will result in a movement on the same plane, i.e. it will end up in a different position on the same face; but we need it to 'leave' the face it sits on. The face that it is NOT on needs to be rotated
  childIndex = childCrossEdge['facet_indexes'][1] // the facet index array holds the actual index of the face to be turned. Although the face name is known, we also have to know the index of the face in order to calculate how far of a rotation distance the target is from the piece to insert (using the color facet face as a reference). 

  console.log('childIndex: this is the index of the FACE that needs to be rotated, it will be in the zero or \'1\' position on the facet_indexes array on the cross piece object - the color facet of the cross piece sits on this face')
console.log(childIndex)
console.log('childColor; this gives the color of the non-white facet. It is switched to compare it to the master cross piece (in the down layer) to determine the natural distance of the cross piece from the master, so that if the cross piece is not at the natural distance, relative to the master (the correct distance results in the master and child cross piece being permuted correctly, relative to each other),  the difference between the cross piece\'s current index and the index of its natural distance from the master can be calculated;  the down layer can then be adjusted by that difference, to ensure the master and cross piece are the correct distance apart; the cross piece can then be inserted, permuted correctly, relative to the master.')
console.log(childColor)

}else{
   whiteFacetFace = childCrossEdge['piece_position'][1] // white is at L/R face
  console.log(`white facet is on ${whiteFacetFace} face`)
  childColor = childCrossEdge['cross_piece'][0] // child color facet must be at index zero
  childIndex = childCrossEdge['facet_indexes'][0] // child facet 'face-index' must be at position 0 in the facet_indexes array
  
 
}

console.log('vertical edge index for BL, FL, FR, BR')
console.log(vertical_edge_index)
console.log('objects of cross pieces on middle layer')
console.log(midLayerCrossEdgesArray)

// updated information about cross pieces on the down layer for the next step. 
updateLayer1CrossEdges()
// now, if there are cross pieces on the down layer
       if(orientedCrossEdgeArray.length > 0){
        console.log('oriented pieces exist in first layer')
        // if there is at least one oriented cross edge in the down layer
          // then use the first instance as a master from which to calculate the natural distance from the master; note that if at this juncture there are oriented cross edge pieces in the down layer, they will have been permuted correctly relative to each other, since, that occurs BEFORE a check for cross pieces sitting in the mid layer. This means that it doesn't really matter which down layer cross piece is used as a guide, but for uniformity the first instance is used here. 

// get the object of the master cross edge
let masterEdgePiece = orientedCrossEdgeArray[0]

// variable for the colour of master non-white facet
let masterColor  = masterEdgePiece['cross_piece'][1]
// variable for the index master non-white facet
let masterIndex = masterEdgePiece['index_in_layer']
// variable for the natural distance of child cross piece from the master
let naturalDistance;
console.log('master color facet')
console.log(masterColor)
console.log('master cross piece non-white color')
console.log(masterIndex)



// DETERMINE MASTER COLOR
if(masterColor  == 'o'){ // colour is ORANGE
  console.log('master color is orange')
  // SECOND PIECE COLOR
  if(childColor == 'g'){ // colour 2 is 'GREEN'
  naturalDistance = 3
  }else if(childColor == 'r'){ // colour is RED 
  naturalDistance = 2
  }else{ // the remaining colour must be BLUE
     naturalDistance = 1
            }
  }else if(masterColor == 'b'){ // colour is RED
    //  SECOND PIECE COLOR
    if(childColor == 'o'){ // colour 2 is 'ORANGE'
      naturalDistance = 3
    }else if(childColor == 'g'){ // colour is GREEN 
    naturalDistance = 2
    }else{ // the remaining colour must be RED
       naturalDistance = 1
    }
  }else if(masterColor == 'r'){ // colour is RED
    //  SECOND PIECE COLOR
    if(childColor == 'b'){ // colour 2 is 'BLUE'
      naturalDistance = 3
    }else if(childColor == 'o'){ // colour is ORANGE 
    naturalDistance = 2
    }else{ // the remaining colour must be GREEN
       naturalDistance = 1
    }
  }else{// colour must be GREEN
    //  SECOND PIECE COLOR
    if(childColor == 'r'){ // colour 2 is 'RED'
      naturalDistance = 3
    }else if(childColor == 'b'){ // colour is BLUE 
    naturalDistance = 2
    }else{ // the remaining colour must be ORANGE
       naturalDistance = 1
    }
  }
  placeMidLayerCrossPiece(masterIndex, childIndex, naturalDistance, vertical_edge_index, whiteFacetFace)
  
        }else{ // there are no correctly oriented edge pieces in the down layer; INSERT THE CROSS PIECE - so the place mid cross piece function is not used for the directly placement of the cross piece from the middle layer if there are no down layer oriented cross pieces
console.log('oriented cross array is empty')
 
setTimeout(() => {
  switch(vertical_edge_index){
// DETERMINE VERTICAL EDGE THAT THE CROSS PIECE SITS ON
    case 0:
      if(childIndex === 1){ // BL edge, color is on left-face
        leftRotate('l-prime-btn')
      }else{
        backRotate('b-btn') // color facet is on back-face
      }
      break;
      case 1:
        if(childIndex === 1){// FL edge, color is on left-face
          leftRotate('l-btn')
        }else{
          frontRotate('f-prime-btn')// color is on front-face
        }
        break;
        case 2:
          if(childIndex === 3){// FR edge, color is on right-face
            rightRotate('r-prime-btn')
          }else{
            frontRotate('f-btn') // color is on front-face
          }
          break;
          default:
            if(childIndex === 3){ // BR edge, color is on right-face
              rightRotate('r-btn')
            }else{
              backRotate('b-prime-btn')// color is on back face
            }

   }

 }, 1600);

  setTimeout(() => {
    updateLayer1CrossEdges()
    if(orientedCrossEdgeArray.length < 4){
      checkCrossPiecesLastLayer()
    }else{
      // handle cross
      handleFullCross()
    }
  }, 2600);

        }

      }else{
        console.log('there are no cross pieces on the middle layer; checking for cross pieces on the last layer')
        updateLayer1CrossEdges()
        if(orientedCrossEdgeArray.length < 4){
          checkCrossPiecesLastLayer()
        }else{
          // handle cross
          handleFullCross()
        }

      }

}

// PLACING MID LAYER CROSS PIECES INTO DOWN LAYER
function placeMidLayerCrossPiece(A, B, permuteDistance, verticalEdgeIndex, faceWhiteFacet){

  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permuted = (A + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of B
  let rotationsToPermuted;
  // variable for absolute rotations to correct permuted position of B; this value is used to turn the D-layer the correct distance so that when the mid layer cross piece is inserted, it is correctly permuted. 
 let rawRotation;
  if(B === permuted){
 // then the cross piece sits in the correct position to be slotted into place on the down layer - the D-LAYER doesn't need to rotate and the face holding the cross piece (the non-white facet) just needs to rotate once for the piece to be inserted. Given that we already have the index for the face that the color facet sits on, once you know the corner of the edge piece, then it becomes obvious where the white facit is and that will determine how the face is turned. 
   setTimeout(() => {
    switch(verticalEdgeIndex){
      /**
       this is the vertical edge of the cube where 0 <= case <= 3, with the following key for each integer
       NOTE: each letter in the string describing the vertical edge has an index as below:
       index 0: left character
       index 1: right character
       0 = BL
       1 = FL
       2 = FR
       3 = BR
       */
      case 0:
        if(B === 1){ // BL vertical edge, color is on left-face
          leftRotate('l-prime-btn')
        }else{
          backRotate('b-btn') // color facet is on back-face
        }
        break;
        case 1:
          if(B === 1){// FL vertical edge, color is on left-face
            leftRotate('l-btn')
          }else{
            frontRotate('f-prime-btn')// color is on front-face
          }
          break;
          case 2:
            if(B === 3){// FR vertical edge, color is on right-face
              rightRotate('r-prime-btn')
            }else{
              frontRotate('f-btn') // color is on front-face
            }
            break;
            default:
              if(B === 3){ // BR vertical edge, color is on right-face
                rightRotate('r-btn')
              }else{
                backRotate('b-prime-btn')// color is on back face
              }
  
     }
  
   }, 1600);
 
    setTimeout(() => {
      // update the down layer cross pieces status and then, if all cross pieces are not on the down layer, check the last layer for cros pieces. ALTERNATIVELY IT MIGHT BE A GOOD IDEA TO CHECK THE MID LAYER AGAIN, AND THEN WHEN THERE IS NO CROSS PIECE ON THE MID LAYER, MOVE TO THE LAST LAYER.  THA IS FOR A FUTURE CONSIDERATION. 
      updateLayer1CrossEdges()
      if(orientedCrossEdgeArray.length < 4){
        checkCrossPiecesLastLayer()
      }else{
        // handle cross
        handleFullCross()
      }
    }, 2600);
  
  }else{ // piece B is not permuted correctly relative to piece A: find the absolute distance between the correct permutation position and position of 'B'
    console.log('down layer needs rotation')
rawRotation = permuted - B

// if the rotation direction is negative
if(rawRotation < 0){
//adding 4 to a negative number of rotations gives the required number of forward rotations
  rotationsToPermuted = rawRotation + 4
}else if(rawRotation > 0){ // otherwise the rotation direction is positive

  // otherwise the number of rotations is positive; use the raw rotation value
  rotationsToPermuted = rawRotation
}


// switch the number of rotations to permuted so the down layer can DO THE CORRECT NUMBER OF ROTATIONS IN ORDER to receive the child cross piece

// the down layer is timed to occur before the side-face rotation;
switch(rotationsToPermuted){
case 1: // just one forward rotation so just the d-btn string

setTimeout(() => { // single rotation of down layer
     downRotate('d-btn')
}, 1600);

break;
case 2:// a double rotation of down layer
setTimeout(() => {
    downRotate('d2-btnless', 'double')
}, 1600);

break;
case 3: // single prime rotation of down layer
setTimeout(() => {
    downRotate('d-prime-btn')
}, 1600);

break;
}


setTimeout(() => {
  // check which vertical edge the cross piece sits on; and determine which of the two faces straddled by the vertical edge needs to turn in order to insert the cross piece into the down layer, correctly oriented: this needs to be done AFTER the down layer has been rotated so that the mid layer cross piece is at its natural distance from the down layer cross piece. 

  // check vertical edge index
switch(verticalEdgeIndex){
  case 0: // vertical corner is back-left
    if(faceWhiteFacet == 'back'){
      leftRotate('l-prime-btn')
      
    }else{
      backRotate('b-btn')
  
    }
    break;
    case 1:
      if(faceWhiteFacet == 'front'){
        leftRotate('l-btn')
       
      }else{
        frontRotate('f-prime-btn')

      }
      break;
      case 2:
        if(faceWhiteFacet == 'front'){
          rightRotate('r-prime-btn')
         
        }else{
          frontRotate('f-btn')

        } 
        break;
        default:
          if(faceWhiteFacet == 'back'){
            rightRotate('r-btn')
   
          }else{
            backRotate('b-prime-btn')
       
          } 
       // AT THIS POINT THE CROSS PIECE SHOULD BE INSERTED   

}



}, 3200);

setTimeout(() => {
updateLayer1CrossEdges()
  if(orientedCrossEdgeArray.length < 4){
    console.log('running check on last layer for cross pieces... line 1754')
    checkCrossPiecesLastLayer()
  }else{
    // handle cross
    handleFullCross()
  }

}, 4600);



  }
}

// LAST LAYER VARIABLES
 // variables for child object containing all details about the last layer cross piece, cross piece edge, non-white facet color and index of cross piece relative to its side face, and side-face position name (e.g right/left/front/back)
 let childObj
 let childCrossEdge
 let childColor;
let childIndex;
let childPosition;
// the below 'oriented' variable, which is assigned a boolean  depending on whether the white facet is oriented upward or not; will be used in a switch statement (or an IF/ELSE condition) to determine the path of the cross piece to its oriented and permuted position on the down layer. 
let oriented;

// array for cross edges on middle layer
let lastLayerCrossEdgesArray = []

function checkCrossPiecesLastLayer(){
  lastLayerCrossEdgesArray = []
console.log('checking last layer from white cross edge pieces... ')

upLayerEdges.forEach((edge,index) =>{
  if( edge[0] == 'w'|| edge[1] == 'w'){
    // if either of the edge's facets is white incriment the cross pieces

              // name the edge piece according to the position  where it lies in the layer
              if(index === 0){
                crossPiecePosition = ['up', 'back']
                facetIndexes = [0, 2]
              }else if(index === 1){
                crossPiecePosition = ['up', 'left']
                facetIndexes = [0, 1]
              }else if(index === 2){
                crossPiecePosition = ['up', 'front']
                facetIndexes = [0, 2]
              }else{
                crossPiecePosition = ['up', 'right']
                facetIndexes = [0, 3]
              }




lastLayerCrossEdgesArray.push({
'index': index,
'facet_indexes': facetIndexes,
'cross_piece': edge, 
'piece_position':crossPiecePosition
})}
})

console.log('last layer cross pieces')
console.log(lastLayerCrossEdgesArray)
// if there are cross pieces on the last layer
if(lastLayerCrossEdgesArray.length > 0){


// get child Obj, the cross piece on the last layer
childObj = lastLayerCrossEdgesArray[0]
// get child cross piece
 childCrossEdge = childObj['cross_piece']
// get child cross piece index; this index references the side-face that the cross piece is part of
childIndex = childObj['index']
// get side-face name associated with child. NOTE: irrespective of the orientation of the cross piece on the last layer, that is, whether the white facet is on the up-face or a side-face, the side face that the cross piece sits on is the face that needs to be turned initially in order to move the cross piece. the path of the cross piece will change depending on the orientation of the piece, which can be determined using the IF/ELSE condition below
childPosition = childObj['piece_position'][1]

 // determine child non-white facet color
 if(childCrossEdge[0] == 'w'){ // the white face is facing upward, because the first colour in the edge array refers to the up direction
  childColor = childCrossEdge[1] // so the side-face holds the color facet; the piece is oriented for direct placement
  oriented = true;
  }else if(childCrossEdge[1] == 'w'){
    childColor = childCrossEdge[0] //  the up-face holds the color facet; the piece is not oriented for direct placement
    oriented = false;

  }

console.log('oriented')
console.log(oriented)

// if cross pieces exist on the down layer, one of them can be used to calculate where the cross piece in the last layer should go. 
if(orientedCrossEdgeArray.length > 0){
  // get master cross piece
let masterEdgePiece = orientedCrossEdgeArray[0]
// get master facet non-white color
 let masterColor = masterEdgePiece['cross_piece'][1]
 // get index of master 
 let masterIndex = masterEdgePiece['index_in_layer']


// switch master color and determine child colour, then send, as parameters to the 'place last layer cross piece' function, master and child index, number of rotations from master index to permuted child index, oriented status of cross piece, and the name of the side-face that the cross piece sits on. 

if(masterColor  == 'o'){ // colour is ORANGE
  // DETERMINE THE COLOUR OF THE SECOND PIECE
  if(childColor == 'g'){ // colour 2 is 'GREEN'
    placeLastLayerCrossPiece(masterIndex, childIndex, 3, oriented, childPosition)
  }else if(childColor == 'r'){ // colour is RED 
    placeLastLayerCrossPiece(masterIndex, childIndex, 2, oriented, childPosition)
  }else{ // the remaining colour must be BLUE
    placeLastLayerCrossPiece(masterIndex, childIndex, 1, oriented, childPosition)
            }
  }else if(masterColor == 'b'){ // colour is RED
    // DETERMINE THE COLOUR OF THE SECOND PIECE
    if(childColor == 'o'){ // colour 2 is 'ORANGE'
      placeLastLayerCrossPiece(masterIndex, childIndex, 3, oriented, childPosition)
    }else if(childColor == 'g'){ // colour is GREEN 
      placeLastLayerCrossPiece(masterIndex, childIndex, 2, oriented, childPosition)
    }else{ // the remaining colour must be RED
      placeLastLayerCrossPiece(masterIndex, childIndex, 1, oriented, childPosition)
    }
  }else if(masterColor == 'r'){ // colour is RED
    // DETERMINE THE COLOUR OF THE SECOND PIECE
    if(childColor == 'b'){ // colour 2 is 'BLUE'
      placeLastLayerCrossPiece(masterIndex, childIndex, 3, oriented, childPosition)
    }else if(childColor == 'o'){ // colour is ORANGE 
      placeLastLayerCrossPiece(masterIndex, childIndex, 2, oriented, childPosition)
    }else{ // the remaining colour must be GREEN
      placeLastLayerCrossPiece(masterIndex, childIndex, 1, oriented, childPosition)
    }
  }else{// colour must be GREEN
    // DETERMINE THE COLOUR OF THE SECOND PIECE
    if(childColor == 'r'){ // colour 2 is 'RED'
      placeLastLayerCrossPiece(masterIndex, childIndex, 3, oriented, childPosition)
    }else if(childColor == 'b'){ // colour is BLUE 
      placeLastLayerCrossPiece(masterIndex, childIndex, 2, oriented, childPosition)
    }else{ // the remaining colour must be ORANGE
      placeLastLayerCrossPiece(masterIndex, childIndex, 1, oriented, childPosition)
    }
  }
 
}else{   console.log('there are no cross pieces on the down layer')
  // there are no oriented cross pieces on the down layer, so the last layer cross piece can be inserted without a permutation check - either just doing a double rotation on the side-face, if 'oriented === true', or a single forward rotation of the side-face and then a prime rotation of the face at index '(side-face index + 1)%4', if 'oriented === false'. 

  if(oriented === true){ // the white facet is on the up-face
    switch(childPosition){
      case 'back': // double rotate back
        backRotate('b2-btnless', 'double')
        break;
        case 'left': // double rotate left
          leftRotate('l2-btnless', 'double')
          break;
          case 'front': // double rotate front
            frontRotate('f2-btnless', 'double')
            break;
            default: // this must be the right face - double rotate right
            rightRotate('r2-btnless', 'double')
    }

    // after the piece is placed, execute the down layer check
    setTimeout(() => {
      checkCrossDownLayer()
    }, 500);

  }else if(oriented === false){

    switch(childPosition){
      case 'back': // single rotate back, followed by left prime
      setTimeout(() => {
        backRotate('b-btn')
      }, 1000);
      setTimeout(() => {
        leftRotate('l-prime-btn')
      }, 2000);
     
      
        break;
        case 'left': // single rotate left, followed by front prime
        setTimeout(() => {
          leftRotate('l-btn')
        }, 1000);
        setTimeout(() => {
          frontRotate('f-prime-btn')
        }, 2000);
       
         
          break;
          case 'front': // single rotate front, followed by right prime
          setTimeout(() => {
            frontRotate('f-btn')
          }, 1000);
          setTimeout(() => {
            rightRotate('r-prime-btn')
          }, 2000);
         
          
            break;
            default: // this must be the right face - single rotate right, followed by back prime
            setTimeout(() => {
              rightRotate('r-btn')
            }, 1000);
            setTimeout(() => {
              backRotate('b-prime-btn')
            }, 2000);
            
            
    }
  

setTimeout(() => {
  updateLayer1CrossEdges()
  console.log(orientedCrossEdgeArray)
  console.log('line 2154')
  if(orientedCrossEdgeArray.length < 4){
    console.log(orientedCrossEdgeArray.length)
    checkNonOrientedCrossPieces()
  }else{
    // handle cross
    handleFullCross()
  }
}, 3000);
  }else{
    // something is wrong; there is no orientation information on the last layer cross piece
    console.log('there is no orientation information on the child cross piece')


    updateLayer1CrossEdges()
    console.log(orientedCrossEdgeArray)
    console.log('line 2154')
    if(orientedCrossEdgeArray.length < 4){
      console.log(orientedCrossEdgeArray.length)
      // NEXT FUNCTION
      // checkNonOrientedCrossPieces()
    }else{
      // handle cross
      handleFullCross()
    }
    
  }
}
}else{
  // no cross pieces on last layer
  updateLayer1CrossEdges()
  console.log(orientedCrossEdgeArray)
  console.log('line 2154')
  if(orientedCrossEdgeArray.length < 4){
    console.log(orientedCrossEdgeArray.length)
    checkNonOrientedCrossPieces()
  }else{
    // handle cross
    handleFullCross()
  }
}
}





// placing a lasts layer cross piece into down layer oriented and permuted. 
function placeLastLayerCrossPiece(masterIndex, childIndex, permuteDistance, orientation, side_face){
  console.log('running placement of last layer cross piece... line 1922')
  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permutedIndex = (masterIndex + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of child
  let rotationsToPermuted;
  // variable for absolute rotations to correct permuted position of B; this value is used to turn the D-layer to the correct position for insertion of the cross piece from the U-layer
 let rawRotation; 

 // if the piece is already at the correct index for permutation
 if(childIndex === permutedIndex){
// the cross piece sits at the index of correct permutation: check the orientation of the cross piece. 
 setTimeout(() => {
  switch(orientation){
    case true: // cross piece is oriented such that it can be placed directly to the correctly permuted position, in one move
    if(side_face == 'back'){

      backRotate('b2-btnless', 'double')
    }else if(side_face == 'left'){
      leftRotate('l2-btnless', 'double')
    }else if(side_face == 'front'){
      frontRotate('f2-btnless', 'double')
    }else{ // side-face must be right
      rightRotate('r2-btnless', 'double')
    }

    
break;
default://cross piece is oriented such that more than one move is required to enable placement to the correctly permuted position. 
if(side_face == 'back'){
  setTimeout(() => {
    backRotate('b-btn')
  }, 1000);
  setTimeout(() => {
    downRotate('d-btn') 
  }, 2000);
  setTimeout(() => {
    leftRotate('l-prime-btn') 
  }, 3000);
}else if(side_face == 'left'){
  setTimeout(() => {
    leftRotate('l-btn')
  }, 1000);
  setTimeout(() => {
    downRotate('d-btn') 
  }, 2000);
  setTimeout(() => {
    frontRotate('f-prime-btn')
  }, 3000);
}else if(side_face == 'front'){
  setTimeout(() => {
    frontRotate('f-btn')
  }, 1000);
  setTimeout(() => {
    downRotate('d-btn') 
  }, 2000);
  setTimeout(() => {
    rightRotate('r-prime-btn')
  }, 3000);
}else{ // side-face must be right
  setTimeout(() => {
    rightRotate('r-btn')
  }, 1000);
  setTimeout(() => {
    downRotate('d-btn')
  }, 2000);
  setTimeout(() => {
    backRotate('b-prime-btn')
  }, 3000);
}


   }
 
 }, 1000);
// run and check for non oriented pieces on the down layer now that a pass of all levels of the cube has been made
setTimeout(() => {
  updateLayer1CrossEdges()
  console.log(orientedCrossEdgeArray)
  console.log('line 2154')
  if(orientedCrossEdgeArray.length < 4){
    console.log('the number of oriented cross pieces on the down layer is:')
    console.log(orientedCrossEdgeArray.length)
    checkNonOrientedCrossPieces()
  }else{
    // handle cross
    handleFullCross()
  }

}, 5000);




}else{ // the cross piece is not at the correctly permuted index. So before it can be placed the down layer needs to be rotated the appropriate distance

   rawRotation = permutedIndex - childIndex

  if(rawRotation < 0){ // adjust negative rotational values for forward rotation
    rotationsToPermuted = rawRotation + 4
  }else{ // raw rotation is already positive so use the original rotation for rotations to permuted 
    rotationsToPermuted = rawRotation
  }

  // ROTATE DOWN LAYER TO CORRECT POSITION READY TO HAVE CROSS PIECE INSERTED
  setTimeout(() => {
    // switch rotations to permuted to see how many rotations to make on the down layer
    switch(rotationsToPermuted){
      case 1:
        downRotate('d-btn')
        break;
        case 2:
          downRotate('d2-btnless', 'double')
          break;
          default: // this value must be 3, since there are only three possible rotation positions if the child cross piece is not permuted correctly. 
          downRotate('d-prime-btn')
  
    }
  }, 1000);
  // now rotate the down layer accordingly by switching the value of rotations to permuted value

  // once the down face is rotated, exexute the rotations required for childIndex === rotationsToPermuted
  // FIRST: check the orientation of the cross piece. 
 setTimeout(() => {
  // CHECKING CROSS PIECE ORIENTATION
  let tempAlgArray = []
  switch(orientation){
    case true: // cross piece is oriented such that it can be placed directly to the correctly permuted position, in one move
    if(side_face == 'back'){
      backRotate('b2-btnless', 'double')
    }else if(side_face == 'left'){
      leftRotate('l2-btnless', 'double')
    }else if(side_face == 'front'){
      frontRotate('f2-btnless', 'double')
    }else{ // side-face must be right
      rightRotate('r2-btnless', 'double')
    }
break;
default://cross piece is oriented such that more than one move is required to enable placement to the correctly permuted position. 
if(side_face == 'back'){ // side-face is back
tempAlgArray = ['B','D', 'L`']
algorithmExecution(tempAlgArray)

  // setTimeout(() => {
  //   backRotate('b-btn')
  // }, 1000);
  // setTimeout(() => {
  //   downRotate('d-btn')
  // }, 2000);
  // setTimeout(() => {
  //   leftRotate('l-prime-btn')
  // }, 3000);


}else if(side_face == 'left'){ // side face is front
  tempAlgArray = ['L','D', 'F`']
algorithmExecution(tempAlgArray)

  // setTimeout(() => {
  //   leftRotate('l-btn')
  // }, 1000);
  // setTimeout(() => {
  //   downRotate('d-btn')
  // }, 2000);
  // setTimeout(() => {
  //   frontRotate('f-prime-btn')
  // }, 3000);

}else if(side_face == 'front'){ // side-face is front
  tempAlgArray = ['F','D', 'R`']
algorithmExecution(tempAlgArray)

  // setTimeout(() => {
  //   frontRotate('f-btn')
  // }, 1000);
  // setTimeout(() => {
  //   downRotate('d-btn')
  // }, 2000);
  // setTimeout(() => {
  //   rightRotate('r-prime-btn')
  // }, 3000);


}else{ // side-face must be right
  tempAlgArray = ['R','D', 'B`']
algorithmExecution(tempAlgArray)

  // setTimeout(() => {
  //   rightRotate('r-btn')
  // }, 1000);
  // setTimeout(() => {
  //   downRotate('d-btn')
  // }, 2000);
  // setTimeout(() => {
  //   backRotate('b-prime-btn')
  // }, 3000);

}
   }
 }, 1200);

 setTimeout(() => {
 updateLayer1CrossEdges()
console.log(orientedCrossEdgeArray)
console.log('line 2154')


if(orientedCrossEdgeArray.length < 4){
  console.log(orientedCrossEdgeArray.length)
  checkNonOrientedCrossPieces()
}else{
  // handle cross
  handleFullCross()
}
}, 6000);
}
}

/*

let totalOriented = 0;
downLayerEdges.forEach(edge =>{
if(edge[0] == 'w'){
  totalOriented ++;
}
})
  if(totalOriented < 4){
    checkNonOrientedCrossPieces()
  }
 */

 // function switches permutation of cross pieces to determine which set of moves are needed to solve the permutation. 
  function fullCrossPermutations(permutation){

// switch the permutation
switch(permutation){
  case '0132':
    crossPermutation0132()
  break;
  case '0213':
    crossPermutation0213()
  break;
  case '0231':
    crossPermutation0231()
  break;
  case '0312':
    crossPermutation0312()
  break;
  case '0321':
  antiIdentityPermutation0321()
  break;
  case '0123': identityPermutation0123()
    break;
  }
  }

// FUNCTIONS FOR  PERMUTATION OF ALL CROSS PIECES


  function crossPermutation0132(){
    console.log('0132 permutation')
    let tempAlgArray = []
    tempAlgArray = ['R2','D', 'R2`','D`', 'R2']
algorithmExecution(tempAlgArray)


    // setTimeout(() => {
    //   rightRotate('r2-btnless', 'double')
    // },1000);

    // setTimeout(() => {
    //   downRotate('d-btn')
    // },2500);

    // setTimeout(() => {
    //   rightRotate('r2-btnless', 'double')
    // },3500);

    // setTimeout(() => {
    //   downRotate('d-prime-btn')
    // },5000);

    // setTimeout(() => {
    //   rightRotate('r2-btnless', 'double')
    // },6000);

    // if one piece is incorrectly oriented thetn run the function for checking incorrectly oriented pieces on the down layer
    setTimeout(() => {
    if(incorrectlyOrientedPieceArray.length > 0){
      checkNonOrientedCrossPieces()
    }else if(orientedCrossEdgeArray.length < 4){
      // this means that a 'dummy' piece was included in the permutation of four edges on the down layer and, given taht there are no incorrectly oriented pieces on the down layer, the fourth piece mast be either on the mid layer or on the last layer, so a mid layer check can be made. 
      checkCrossPieceMidLayer()
      
    }else{
      // handle cross
      handleFullCross()
    }
    },8500);
  } // tested and working

  function crossPermutation0213(){
    console.log('0213 permutation')
    let tempAlgArray = []
    tempAlgArray = ['L2','D`', 'L2`','D', 'L2']
algorithmExecution(tempAlgArray)


    // setTimeout(() => {
    //   leftRotate('l2-btnless', 'double')
    // },1000);

    // setTimeout(() => {
    //   downRotate('d-prime-btn')
    // },2500);

    // setTimeout(() => {
    //   leftRotate('l2-btnless', 'double')
    // },3500);

    // setTimeout(() => {
    //   downRotate('d-btn')
    // },5000);

    // setTimeout(() => {
    //   leftRotate('l2-btnless', 'double')
    // },6000);
        // if one piece is incorrectly oriented thetn run the function for checking incorrectly oriented pieces on the down layer
        setTimeout(() => {
          if(incorrectlyOrientedPieceArray.length > 0){
            checkNonOrientedCrossPieces()
          }else if(orientedCrossEdgeArray.length < 4){
            // this means that a 'dummy' piece was included in the permutation of four edges on the down layer and, given taht there are no incorrectly oriented pieces on the down layer, the fourth piece mast be either on the mid layer or on the last layer, so a mid layer check can be made. 
            checkCrossPieceMidLayer()
            
          }else{
            // handle cross
            handleFullCross()
          }
          },8500);
  } // tested and working

  function crossPermutation0231(){
    console.log('0231 permutation')
    let tempAlgArray = []
    tempAlgArray = ['R2','D`', 'R2`','D', 'R2','D']
algorithmExecution(tempAlgArray)



//     setTimeout(() => {
//       rightRotate('r2-btnless', 'double')
//     },1000);

//     setTimeout(() => {
//       downRotate('d-prime-btn')
//     },2000);

//     setTimeout(() => {
//       rightRotate('r2-btnless', 'double')
//     },3000);

//     setTimeout(() => {
//       downRotate('d-btn')
//     },4000);

//     setTimeout(() => {
//       rightRotate('r2-btnless', 'double')
//     },5000);
// // needs an extra D-rotate at the end to correctly calibrate the cross
//     setTimeout(() => {
//       downRotate('d-btn')
//     },6000);



        // if one piece is incorrectly oriented thetn run the function for checking incorrectly oriented pieces on the down layer
        setTimeout(() => {
          // update layer one cross edges to ensure that there are still cross pieces missing from the layer prior to executing checks on any other layers. 
          updateLayer1CrossEdges()
          if(incorrectlyOrientedPieceArray.length > 0){
            checkNonOrientedCrossPieces()
          }else if(orientedCrossEdgeArray.length < 4){
            // this means that a 'dummy' piece was included in the permutation of four edges on the down layer and, given taht there are no incorrectly oriented pieces on the down layer, the fourth piece mast be either on the mid layer or on the last layer, so a mid layer check can be made. 
            checkCrossPieceMidLayer()
            
          }else{
            // handle cross
            handleFullCross()
          }
          },10000);
  } // tested and working

  function crossPermutation0312(){
    let tempAlgArray = []
    tempAlgArray = ['L2','D', 'L2`','D`', 'L2','D`']
algorithmExecution(tempAlgArray)


//     setTimeout(() => {
//       leftRotate('l2-btnless', 'double')
//     },1000);

//     setTimeout(() => {
//       downRotate('d-btn')
//     },2500);

//     setTimeout(() => {
//       leftRotate('l2-btnless', 'double')
//     },3500);

//     setTimeout(() => {
//       downRotate('d-prime-btn')
//     },5000);

//     setTimeout(() => {
//       leftRotate('l2-btnless', 'double')
//     },6000);

// // needs an extra D-PRIME rotate at the end to correctly calibrate the cross
// setTimeout(() => {
//   downRotate('d-prime-btn')
// },7500);

    // if one piece is incorrectly oriented thetn run the function for checking incorrectly oriented pieces on the down layer
    setTimeout(() => {
      updateLayer1CrossEdges()
      if(incorrectlyOrientedPieceArray.length > 0){
        checkNonOrientedCrossPieces()
      }else if(orientedCrossEdgeArray.length < 4){
        // this means that a 'dummy' piece was included in the permutation of four edges on the down layer and, given taht there are no incorrectly oriented pieces on the down layer, the fourth piece mast be either on the mid layer or on the last layer, so a mid layer check can be made. 
        checkCrossPieceMidLayer()
        
      }else{
        // handle cross
        handleFullCross()
      }
      },10000);
  } // tested and working

  function antiIdentityPermutation0321(){
    let tempAlgArray = []
    tempAlgArray = ['L2','D2', 'L2`','D2', 'L2']
algorithmExecution(tempAlgArray)


    // setTimeout(() => {
    //   leftRotate('l2-btnless', 'double')
    // },1000);

    // setTimeout(() => {
    //   downRotate('d2-btnless', 'double')
    // },2500);

    // setTimeout(() => {
    //   leftRotate('l2-btnless', 'double')
    // },4000);

    // setTimeout(() => {
    //   downRotate('d2-btnless', 'double')
    // },5500);

    // setTimeout(() => {
    //   leftRotate('l2-btnless', 'double')
    // },7000);

        // if one piece is incorrectly oriented then run the function for checking incorrectly oriented pieces on the down layer
        setTimeout(() => {
          updateLayer1CrossEdges()
          if(incorrectlyOrientedPieceArray.length > 0){
            checkNonOrientedCrossPieces()
          }else if(orientedCrossEdgeArray.length < 4){
            // this means that a 'dummy' piece was included in the permutation of four edges on the down layer and, given taht there are no incorrectly oriented pieces on the down layer, the fourth piece mast be either on the mid layer or on the last layer, so a mid layer check can be made. 
            checkCrossPieceMidLayer()
            
          }else{
            // handle cross
            handleFullCross()
          }
          },8500);


  }// tested and working
  function identityPermutation0123(){
  console.log(`cross solved in ${movesPara.textContent} moves`)
console.log('cross is correctly permuted, begin F2L solve...')


setTimeout(() => {
  findF2Lcorners()
}, 1500);

  }// tested and working


let F2LCornersFirstLayerArray = []
let F2LCornersLastLayerArray = []



function findF2Lcorners(){

  
  // clear F2L arrays for new search
  F2LCornersFirstLayerArray = []
  F2LCornersLastLayerArray = []
whiteCornersArray = []
  setTimeout(() => {
    // SEARCH FIRST LAYER FOR F2L CORNERN PIECES
    downLayerCorners.forEach((corner, index) =>{
      // logging down layer corners

      console.log('index of down layer corners')
      console.log(index)
      console.log('down layer corners - each one; the issue with the wrong vertical index showing for the corner piece, even though the correct facet indexes are shoing, might be here')
      console.log(corner)
      if(corner[0] == 'w' || corner[1] == 'w' || corner[2] == 'w'){
        // if any one of the facets on the corner piece is white, push corner details to array for first layer F2L corners

// for index values of facets on the corner piece (within the current vertical edge)
let cornerFacetIndexes;
// for names of faces straddled by the vertical edge
let verticalEdgeName;
        switch(index){
case 0: verticalEdgeName = ['back', 'left']
cornerFacetIndexes = [5, 0, 1] // note, the indexes say nothing about which facet colours occupy the index positions
break;
case 1: verticalEdgeName = ['front', 'left']
cornerFacetIndexes = [5, 2, 1]
break;
case 2: verticalEdgeName = ['front', 'right']
cornerFacetIndexes = [5, 2, 3]
break;
default: verticalEdgeName = ['back', 'right']
cornerFacetIndexes = [5, 0, 3]
        }


        F2LCornersFirstLayerArray.push({
          'vertical_index': index, // this will be compared with the edge index for rotation if corner and edge indexes differ
          'corner_piece':corner,
          'corner_piece_indexes': cornerFacetIndexes,
          'vertical_edge_name': verticalEdgeName,
          'layer': 1
        })
      }
        })
      
        // check if corner pieces with a white facet have been found
        if(F2LCornersFirstLayerArray.length > 0){
          console.log('F2L corner pieces found on first layer')
          console.log(F2LCornersFirstLayerArray)
          // assesss the first corner piece. 
          assessF2LCornerPiece(F2LCornersFirstLayerArray)
        }else{ 
          
          // SEARCH LAST LAYER FOR F2L CORNER PIECES
          upLayerCorners.forEach(corner =>{
            if(corner[0] == 'w' || corner[1] == 'w' || corner[2] == 'w'){

              let verticalEdgeName;
        switch(index){
case 0: verticalEdgeName = ['back', 'left']
break;
case 1: verticalEdgeName = ['front', 'left']
break;
case 2: verticalEdgeName = ['front', 'right']
break;
default: verticalEdgeName = ['back', 'right']
        }
              F2LCornersLastLayerArray.push({
                'vertical_index': index,
                'corner_piece':corner,
                'vertical_edge_name': verticalEdgeName,
                'layer': 3
              })
            }
              })
// there MUST be white corners on the last layer if none were found on the first layer
              if(F2LCornersLastLayerArray.length > 0){
                console.log('F2L corner pieces found on last layer')
                console.log(F2LCornersLastLayerArray)
                assessF2LCornerPiece(F2LCornersLastLayerArray)
              }
        }
// check which of the two arrays contains F2L corner pieces and show array.  The if/else condition will be used to figure out where the edge pieces are, orientation, distance away from corner piece etc
        



        // the next thing to do is determine the non-white colours of the corner piece. 
        // after that is done, then a search needs to be made for the edge piece matching the two non-white colours of the corner piece

  }, 1500);

}

function assessF2LCornerPiece(array){
console.log(array)
// convert the three color indicators (out of b, r, o and g) for the corner piece into a single string
let cornerWord = array[0]['corner_piece'].join('').toString()
console.log(cornerWord)
console.log(array)

// object for F2L edge that matches currently examined corner; both a default edge and the edge flipped is given in the object because, depending on the orientation of the edge in layers 2 and 3, the colour markers (b, r, o and g) in the subarray containing the edges might be reversed, where colour 1 is switched with colour 2. So, for an examination of the edge, both possibilities are given. Also added is a 'matching_edge' property which will be added to a new  version of the object object once the matching F2L edge is found.  The object will then be sent on to the function for solving the specific case. 
let edgeRequirementsObj = {
  'default_edge': [],
  'flipped_edge': []

}

// check which two color indicators (from: o, g, r and b) the cornerWord includes
if(cornerWord.includes('o') && cornerWord.includes('b')){
  console.log('white, orange and blue corner piece')
  edgeRequirementsObj['default_edge'] = ['o', 'b']
  edgeRequirementsObj['flipped_edge'] = ['b', 'o']
}else if(cornerWord.includes('o') && cornerWord.includes('g')){
  console.log('white, orange and green corner piece')
  edgeRequirementsObj['default_edge'] = ['o', 'g']
  edgeRequirementsObj['flipped_edge'] = ['g', 'o']
}else if(cornerWord.includes('r') && cornerWord.includes('b')){
  console.log('white, red and blue corner piece')
  edgeRequirementsObj['default_edge'] = ['r', 'b']
  edgeRequirementsObj['flipped_edge'] = ['b', 'r']
}else{
  console.log('white, red and green corner piece')
  edgeRequirementsObj['default_edge'] = ['r', 'g']
  edgeRequirementsObj['flipped_edge'] = ['g', 'r']

}

let fullCornerOjbect = {
  'main_details': array[0],
  'edge_requirements':edgeRequirementsObj
}

console.log('corner details line 3229')
console.log(fullCornerOjbect)
    // function for searching edges on mid layer and last layer
    seekMatchingEdgesF2L(fullCornerOjbect)




}



function seekMatchingEdgesF2L(cornerObject){

// array for matching edge
let matchingPairArray = []
let matchingEdge;
// object for matching edge full details incluing positional details, in words, and index details of each facet on the edge. 
let edgeDetails;
// search layers 2 and 3 for the edge piece. 
midLayerEdges.forEach((edge, indexOfVerticalEdge) =>{ // if the edge is found, log and attribute the apppropriate variable
  console.log('checking mid layer edges')
  // log any edges found on the mid layer
  console.log(edge)
  // if the default edge default or flipped edge of the corner piece matches an edge piece on the mid layer
  if((edge[0] == cornerObject['edge_requirements']['default_edge'][0] && edge[1] == cornerObject['edge_requirements']['default_edge'][1]) || (edge[1] == cornerObject['edge_requirements']['default_edge'][0] && edge[1] == cornerObject['edge_requirements']['flipped_edge'][1])){
    // assign the edge the matchingEdge variable
    matchingEdge = edge

    // get the precise facet indexes of the matching edge so it can be included in the F2L pair because its orientation is needed; checking the colors against the vertical edge index will reveal if the pieces are in their natural orientation or are flipped. 
                  // name the edge piece according to the position  where it lies in the layer (NOTE: each of the word arrays and the facet index arrays could be given global variables since they never change; but it might not be able to clean the code up that much since the details of cross piece position and facet indexes can only be given as each index is looped through - a variable can substitute the arrays, but there is still quite a bit of code; an object could be used where the two arrays could be values of properties on the object, with one object for each vertical edge to contain all of the array information)
                  if(indexOfVerticalEdge === 0){
                    edgeDetails = {
                      'edge_position':['back', 'left'],
                      'facet_indexes':[0, 1]
                    }
                  }else if(indexOfVerticalEdge === 1){
                    edgeDetails = {
                      'edge_position':['front', 'left'],
                      'facet_indexes':[2, 1]
                    }
                  }else if(indexOfVerticalEdge === 2){
                    edgeDetails = {
                      'edge_position':['front', 'right'],
                      'facet_indexes':[2, 3]
                    }
                  }else{
                    edgeDetails = {
                      'edge_position':['back', 'right'],
                      'facet_indexes':[0, 3]
                    }
                  }
    // create a new object and include the matching edge; the object now has the F2L pair (you probably also need the exact details of the corner piece)

    // Actually instead of having several separate properties for the details of the matching edge, just have an object, like the corner details, but for matching edge, that contains all of the properties.  So first create an 'edge object' with all the details relevant to the edge such as index of the vertrical edge, which is where the matching edge is located, and vertical edge description and how those desctriptions relate to the facets of the matching edge,  which will also be included in the object. 

    // create the object for the matching edge and associated vertical edge details
    let edgeObject = {
      'layer':2,
      'matching_edge': matchingEdge, 
      'edge_index':indexOfVerticalEdge, 
      'vertical_edge_details':edgeDetails
    }
    let  F2LPairObj = {
      'corner_details': cornerObject,
      'edge_details': edgeObject

    }
    matchingPairArray.push(F2LPairObj)
    console.log(matchingPairArray)
  }else{
console.log('matching edge not found on mid layer')
matchingEdge = 'first layer null'

  }
})

// if the mid layer didn't have a matching edge piece then the matchingEdge variable will just be the string 'first layer null'
if(matchingEdge == 'first layer null'){
  console.log(matchingEdge)
  // then no matching edge was found on the first layer - check the last layer
  upLayerEdges.forEach(edge =>{
    console.log('checking up layer edges')
  
    if(edge == cornerObject['edge_requirements']['default_edge'] || edge == cornerObject['edge_requirements']['flipped_edge']){
         // assign the edge the matchingEdge variable
    matchingEdge = edge
    console.log('edge found on up layer')
   

    // create an object for the matching edge and associated vertical edge
    let edgeObject = {
      'layer': 3,
      'matching_edge': matchingEdge, 
      'edge_index':indexOfVerticalEdge, 
      'vertical_edge_details':edgeDetails
    }
    // create a new object and include the matching edge; the object now has the F2L pair
   let  F2LPairObj = {
    'corner_details': cornerFullDetails,
    'edge_details':edgeObject
      }

      // push matching pair details to array
      matchingPairArray.push(F2LPairObj)
  
  }})

}

joinMatchingPair(matchingPairArray[0])
}

function joinMatchingPair(F2LPair){
console.log(F2LPair)
// variable for rotational value for down face
let rotateValue
// first step is to check the difference between the edge piece index and the corner piece index
let pairIndexDifference = F2LPair['corner_details']['main_details']['vertical_index'] - F2LPair['edge_details']['edge_index']
// check the value
switch(pairIndexDifference){
  case 0: // then the pieces are already joined
  console.log('F2L paire joined')
  break;
  default: // any other value then the down face needs to turn the correct distance to join
  if(pairIndexDifference < 0){
    rotateValue = pairIndexDifference + 4
  }else{rotateValue = pairIndexDifference}
}


// after the rotational value is calculated, switch the value to  determine athe down face rotation required to join the matching pair

// NOTE: NEED TO CHANGE THE CORNER DETAILS AFTER THE DOWN ROTATE SO THAT THE POSITION OF THE PIECE IS ACCURATELY REPRESENTED WHEN TAKING CORNER DETAILS FROM THE F2L PAIR OBJECT - GOT IT: I forgot to change the index using; index = index + rotateValue, which I used for the facet indexes, but not for the vertical edge index.. SOLVED. 


// After the down rotation, then it might be a good idea to re-calculate the properties of the corner piece, and in that way it would be possible to see how its orientation, when paired with the matchin edge, affects the overall pair facets, and then that can be used to decide which algorithm is needed to solve the pair. 

// show the down layer corners (AFTER THE DOWN MOVEMENTS SO THIS NEEDS TO OCCUR AFTER THE SET TIMEOUT FOR THE DOWN FACE)
setTimeout(() => {

  // get corner layer
  let cornerLayer = F2LPair['corner_details']['main_details']['layer']
  // get edge layer
  let edgeLayer = F2LPair['edge_details']['layer'];
  // from here we can just fix the facet indexes of the corner piece by adding the rotate value (and using the %4 operator) on the array holding the indexes for the previous values for the corner's facet indexes 
console.log(F2LPair)
  // actually just create a new object to compare the two arrays, and leave out the top/bottom facet index of the corner piece
 



// the object is working fine: now, the conditions have to be set for how the F2L pair is configured so that the algorithm can be chosen.  Use say,  'a' and 'b' for indexes, and, 'x' and 'y' for colours and work out the combinations. then the whole process needs to repeat for all four F2L pairs. // but also  other types of cases need handling.  1) corner on last layer and edge on mid layer, 2) corner on bottom and edge on last layer, 3) both corner and edge on last layer. The final case might have additional difficulties since, there is no real reference vertical edge for those cases, because neither of the pieces are locked into a vertical edge, both being on the last layer. This issue can actually be solved by rotating the corner piece to the vertical edge where it sits naturally as part of a solved F2L pair. 


//determine if the piece sits upright or is inverted; this is independent of the orientations of the individual F2L pieces so can be calculated outisde of the conditions for determining the orientation of corner and edge pieces of the F2L pair.   The sum of the two layers will result in one of four numbers, 3, 4, 5 or 6.  Decided not to go for the upright vs inverted pairs, but to use the system mentionen in the console logs below - the sum value will still be used because it indicates the positions of the corner and edge pieces. as shown in the below switch statement
let F2LPairOrientation = cornerLayer + edgeLayer




console.log('orientation value')
console.log(F2LPairOrientation)



    // NOTE: AT THIS POINT, it is not expected that the pair already be joined. If the edge piece is on the mid layer then this will require a down rotation for a corner piece on the down layer or an up rotation if the corner piece is on the last layer, in order for the two pieces to be joined. in other words, if the pair would be inverted, then rotate the last layer to the required location or, rotate the down layer if the piece would be upright. then move the joined F2L pair into the last layer (lying on its side)

    // NOTE 2: I've decided that the best way to solve pieces is not to solve them at the location where they are found, but to move corner pieces or unsolved F2L pairs to the top layer, and then to execute the algorithm specific to the relative positions of the two pieces and the position of the corner piece relative to its natural vertical edge.  Only AFTER this is done, will we assess the rotation of corner pieces, the orientation of edge pieces, and their absolute distance from their associated F2L corner piece - the vertical edge facet indexes will not be needed. 


    // for determining how to turn an F2L  pair on a specific vertical edge, use the index of the vertical edge as a guide; if the vertical index is 'x', then a clockwise rotation of the face at index 'x + 1' will move the F2L pair into the last layer.  then, the last layer will rotate or prime rotate depending on the orientation of of the F2L pair.  If the pair was a layer 1/2 pair then a clockwise rotation of the last layer is needed, otherwise if the pair was a layer 2/3 pair, it is inverted, so a last layer prime rotation is required.  The orientation is already given in the case that determines how a pair is joined. 
let edgeIndex = F2LPair['edge_details']['edge_index']


    switch(F2LPairOrientation){
      case 3: // orientation is upright
       console.log(`
      EDGE: layer 2
      CORNER: layer 1
      rotate down layer to pair the pieces - then execute the appropriate rotations to move the pair to the last layer and to position it at the correct vertical index for solving`)
// DOWN ROTATIONS: rotate value gives the number of rotations needed
      setTimeout(() => {
        switch(rotateValue){
          case 1: downRotate('d-btn')
            break;
            case 2: downRotate('d2-btnless', 'double')
              break;
              case 3: downRotate('d-prime-btn')
                break
                // whichever rotation is used will need to be reversed once the pair is joined and moved to the last layer
        }
        console.log('DOWN ROTATE TO JOIN CORNER LAYER 1 AND EDGE LAYER 2')
      }, 1300);

      // HERE WE NEED TO EXECUTE MOVES TO GET THE F2L PAIR OUT OF THE WAY UP INTO THE LAST LAYER, AND IN ORDER THAT THE DOWN LAYER CAN BE RESET TO THE SOLVED POSITION.   This depends on the exact position of the piece which will have to be switched; 
      setTimeout(() => {
        let tempAlgArray = []
        switch(edgeIndex){

          case 0:
            tempAlgArray = ['L','U', 'L`']
        algorithmExecution(tempAlgArray)



            // setTimeout(() => {
            //   leftRotate('l-btn') 
            // }, 1000);
            // setTimeout(() => {
            //   upRotate('u-btn')
            // }, 2000);
            // setTimeout(() => {
            //   leftRotate('l-prime-btn') 
            // }, 3000);
            console.log('UPRIGHT F2L PAIRE MOVED FROM BACK-LEFT EDGE TO LAYER 1')


            break;
            case 1:
              tempAlgArray = ['F','U', 'F`']
              algorithmExecution(tempAlgArray)

              // setTimeout(() => {
              //   frontRotate('f-btn')
              // }, 1000);
              // setTimeout(() => {
              //   upRotate('u-btn')
              // }, 2000);
              // setTimeout(() => {
              //   frontRotate('f-prime-btn')
              // }, 3000);

              console.log('UPRIGHT F2L PAIRE MOVED FROM FRONT-LEFT EDGE TO LAYER 1')

              break;
              case 2:
                tempAlgArray = ['R','U', 'R`']
                algorithmExecution(tempAlgArray)

                // setTimeout(() => {
                //   rightRotate('r-btn')
                // }, 1000);
                // setTimeout(() => {
                //   upRotate('u-btn')
                // }, 2000);
                // setTimeout(() => {
                //   rightRotate('r-prime-btn')
                // }, 3000);
                console.log('UPRIGHT F2L PAIRE MOVED FROM FRONT-RIGHT EDGE TO LAYER 1')


                break;
                default: // vertical edge index is 3
                tempAlgArray = ['B','U', 'B`']
                algorithmExecution(tempAlgArray)
// setTimeout(() => {
//   backRotate('b-btn')
// }, 1000);
// setTimeout(() => {
//   upRotate('u-btn')
// }, 2000);
// setTimeout(() => {
//   backRotate('b-prime-btn')
// }, 3000);




                console.log('UPRIGHT F2L PAIR MOVED FROM BACK-RIGHT EDGE TO LAYER 1')
        }
      }, 2600);

     // UNDO DOWN LAYER MOVEMENTS
setTimeout(() => {
  switch(rotateValue){
    case 1: // reverse rotation using down prime
    downRotate('d-prime-btn')
      break;
    case 2: // double rotation can be undone with a double rotation
downRotate('d2-btnless', 'double')
    break;
    default: // this value must be three - a prime rotation is the equivalent of 3 forward rotationsn, so just oe forward rotation will undo the move
    downRotate('d-btn')
  }

  // AFTER MOVES HAVE BEEN MADE - CHECK RESULTS
  // where the corner should have landed on the last layer
let newCornerIndex = (edgeIndex - 1)%4
console.log('hopefully this is the position of the corner piece')
      console.log(newCornerIndex)

  // check to see if this index can be used on upLayerCorners to identify corner's new position. 


      // if the move of the F2L pair to the last layer required a clockwise side-face and last layer move, then the index of the moved F2L 'edge' piece in the upLayerEdges, will be the same as the vertical index of the edge prior to its movement. Example; if the edge piece is upright at the vertical index 3 (back/right), then the moves B,U will move the corner to vertical index 2 (as above), but given that the F2L pair is neither upright nor inverted once moved, but laid flat, the edge of the pair is no longer part of a vertical edge.  The uplayerEdges must be used to find the position of the edge piece.  In this case the new index of the edge piece (as it sits in upLayerEdges) is the same as the its vertical index edge prior to the move.  Therefore the edge piece's index is 3.  This is for an upright pair.  For the inverted pairs, anticlockwise side-face and last layer moves are required; the new index of the edge piece in upLayerEdges will be its previous vertical edge index + 1.  The new vertical index position of the corner will also be the previous vertical edge index + 1. 

      // variable for F2L edge facets
      let F2LEdge = upLayerEdges[edgeIndex]
      console.log('F2LEdge')
      console.log(F2LEdge)
      // variable for F2L corner facets
      let F2LCorner = upLayerCorners[newCornerIndex]
      console.log('F2L corner')
      console.log(F2LCorner)
      
      // send updated edge and corner facet information for pair to be solved and inserted. 
solveF2LPair(F2LCorner, F2LEdge, newCornerIndex, edgeIndex)


}, 7900);



      break;
      case 4: console.log(`
      EDGE: layer 3
      CORNER: layer 1
      move corner piece up to last layer; if the face is moved non-prime, then rotate the last layer non-prime, otherwise rotate the other way. Follow up with a last layer rotation to align the corner piece with the appropriate vertical index for solving`)
      break;
      case 5:   console.log(` 
      EDGE: layer 2
      CORNER: layer 3
      rotate up layer to pair the pieces; rotate either face straddled by the vertical edge so that the pair move to the last layer: if the face is rotated non-prime, then rotate the up layer prime, then undo the face rotate - do the opposite if the face rotation is prime. Then locate the natural vertical index for the pair, using the two colours of the pair edge piece `)
        break;
      default: // value has to be 6
      console.log(`
      EDGE: layer 3
      CORNER: layer 3
      both pieces are already on last layer, rotate the corner piece to the natural vertical index, and solve the pair`)
    }
      
  




// CHECK THE ORIENTATION OF THE WHITE PIECE FIRST OF ALL
// corner facets don't need examination until 'AFTER' both pieces have been moved to the last layer
// if(comparisonObj['corner_facets']['alpha'] == 'w'){
// }else if(comparisonObj['corner_facets']['beta'] == 'w'){
// }else{// the white facet must be on the top or bottom of the corner piece
// }


}, 2000);

// I think from here it might be worth sending both the corner and edge colours as arrays to the function which will solve the F2L pair on the last layer. Figure out how to categorize a pair and then execute the appropriate algorithm. 

// RESULTANT CORNER POSITION - When moving an upright F2L pair to L3 (which can only happen on L1/L2 pairs), it's easy to show where the corner piece lands. Take the face which has the same index number as the vertical index at which the corner originally was situated, perform a clockwise rotation on the face, and then a clockwise rotation on the last layer.  This will cause the corner piece index position to decrement by 1. So, if the index of the corner piece on the down layer was 'x', then  the corner piece details, after its move to L3, can be found at uplayerArray[x-1]

// NATURAL INDEX OF F2L PAIR - the natural vertical edge index of the F2L pair is where the corner piece needs to sit in order for the insertion of the solved pair to be in the correct place. This also prevents pairs being inserted into the wrong vertical edge, which would require them to be removed afterward; requiring additional, unneccessary moves.   The two facets on an edge-piece of an F2L pair are unique to one of the four vertical edges; each colour facet pair on an F2L edge piece, i.e. B/R, G/R, B/O or G/0, sits naturally at the vertical index 3, 0, 2 and 1 respectively.   Assigning each color pair its natural index, they can be compared to the current F2L pair edge piece facets, which will give the natural index of the F2L pair, (technically the corner piece could also be used for comparison); applying a difference calculation to the corner index and the edge natural vertical index will reveal how far the last layer needs to turn in order for the corner piece to be sitting at the correct vertical edge index for the solve and insertion of the piece to solve into its natural position on the cube. 


}



function solveF2LPair(corner, edge, cornerIndex, edgeIndex){
  console.log('corner')
  console.log(corner)
  console.log('corner')
  console.log(edge)
  console.log('corner index')
console.log(cornerIndex)
console.log('edge index')
console.log(edgeIndex)
// use edge facet colours determine the natural vertical edge of the F2L pair so that the pair can be moved to where the F2L corner sits at the natural vertical index of the F2L piece, from where a solve will result in an insertion of the F2L pair in the correct position. Then the facets of the pieces can be examined for rotation and orientation, which will, in conjunction with the natural vertical edge index, dictate which algorithm will be executed to solve and insert the F2L pair. The final execition decided upon depends on both the configuration of the F2L pair, and its natural vertical index position




// create a string by joining the elements of the edge array 
let facetString = edge.join('').toString()
// variable for the natural vertical index of the F2L pair
let naturalVerticalIndex;
// variable for the number of forward rotations required to move the F2L corner to the natural vertical index of the F2L pair. 
let rotationsToVI
// switch the string and attribute the appropriate index to the naturalVertualIndex variable, 
// we'll have the index of the corner, which is the natural vertical edge index, but also needed is the index of the edge on the F2L corner edge once the last layer rotation has occurred. This is because it is important to know which way the F2L corner/edge is pointed. Looking from top down, the corner/edge pair will either be pointing x or y
console.log('facetString')
console.log(facetString)
switch(facetString){
  case 'rg': 
  case 'gr':
// red/green edge
naturalVerticalIndex = 0
  break;
  case 'rb':
  case 'br':
// red/blue edge
naturalVerticalIndex = 3
  break;
  case 'ob':
  case 'bo':
 //  orange-blue edge
 naturalVerticalIndex = 2
  break;
  default: // orange-green edge
  naturalVerticalIndex = 1
}

// if/else the sum of current corner index minus natural vertical index
let rotationCalc = naturalVerticalIndex - cornerIndex
console.log('rotations calculation')
console.log(rotationCalc)
if( rotationCalc >= 0){
  rotationsToVI = rotationCalc

}else{
  rotationsToVI = rotationCalc + 4
}


// use the rotationsToVI value to forward rotate the up layer so that the corner F2L piece sits in the correct place for solving. 
setTimeout(() => {
  switch(rotationsToVI){
case 0:
  console.log('F2L corner is in the correct position')
break;
case 1:
  upRotate('u-btn') // a single rotation
  console.log('single last layer rotation')
  break;
case 2:
  upRotate('u2-btnless', 'double')
  console.log('double last layer rotation')
  break;
  default: // 3 rotations required, but a single prime rotation will get the same result. 
  upRotate('u-prime-btn')
  console.log('prime last layer rotation')
  }


}, 2000);


// now examine the pair for solving
setTimeout(() => {

  // variable for white facet axis
  let whiteAxis;
  // variable for match state
  let matched; 
  // variable for F2L corner/edge direction
  let pairFaceRelationship;
  // NOTE:  DIRECTION OF F2L - the direction of the F2L corner/edge piece depends on the position of the edge piece in relationship to the corner piece; it is always parallel to the face which shares the index of the edge piece.  F2L corner/edge piece configuration has a reflection which is perpendicular to the original, and have their own specific solve algorith.  Trying to solve the original F2L with the algorithm for its reflection will not result in a solve and might even result in the pieces being separated.  The edgeIndex argument to this function is used to differentiate between the original F2L and its reflection, by comparing it to the corner index which has the same index as the face that the solve occurs from. If the corner and edge indexes are the same, then the piece lies parallel to the face from which the solve is executed, otherwise it sits perpendicular to the face.  Essentially, the index of the corner piece also indicates the face, as if seen by the solver, from which the solves are executed. 

  // IF CONDITION for determining direction of F2L corner/edge piece. 
switch(cornerIndex){
  case 0:
    if(edgeIndex === 0){
      pairFaceRelationship = 'parallel' // to BACK face
    }else{
      pairFaceRelationship = 'perpendicular' // to BACK face
    }
break;
case 1:
  if(edgeIndex === 1){
    pairFaceRelationship = 'parallel'  // to LEFT face
  }else{
    pairFaceRelationship = 'perpendicular' // to LEFT face
  }
break;
case 2:
  if(edgeIndex === 2){
    pairFaceRelationship = 'parallel' // to FRONT face
  }else{
    pairFaceRelationship = 'perpendicular' // to FRONT face
  }
break;
default: // index is 3
if(edgeIndex === 3){
  pairFaceRelationship = 'parallel' // to RIGHT face
}else{
  pairFaceRelationship = 'perpendicular' // to RIGHT face
}

}


  // use if/else condition on the elements of the corner/edge F2L piece to check which facet is white
  if(corner[1] == 'w'){ // if white is on back or front face
    whiteAxis = 'y'
    if(corner[0] == edge[0]){ // colours match on the UP face
matched = true // matching edges
    }else{ 
      matched = false
    }
  }else if(corner[2] == 'w'){ // white is on left or right face
    whiteAxis = 'x' 
    if(corner[0] == edge[0]){
      matched = true // matching edges
    
    }else{
      matched = false
    }
  }else{ // white is on up face
         whiteAxis = 'z' 
    if(corner[2] == edge[1]){ // white must be on UP face
      matched = true //  matching edges
    
          }else{
            matched = false
          }
  }

  // the information needed for the final solve of F2L corner/edge pairs is: axis of white, the matched boolean, the natural vertical index of the F2L corner/edge pair, and the orientation of the piece with respect to the face that shares the same index as the natural index. 
  solveAlgorithms(whiteAxis, matched, naturalVerticalIndex, pairFaceRelationship)

}, 3000);

function solveAlgorithms(axisOfWhite, matchOrNot, naturaPosition, orientation){
//function for the actual moves. 
setTimeout(() => {
  console.log('white axis')
  console.log(axisOfWhite)
  
  console.log('swapped or not')
  console.log(matchOrNot)
  
  console.log('natural vertical index')
  console.log(naturaPosition)
  
  console.log('orientation of piece WRT solving face')
  console.log(orientation)
  
  // testing the use of arrays to execute functions
  let functionArray = ['L', 'U2', 'L`', 'U`', 'L', 'U', 'L`']

  // test execution of current scramble




  // setTimeout(() => {
  //   leftRotate('l-btn')
  // }, 1000);
  // setTimeout(() => {
  //   upRotate('u2-btnless', 'double')
  // }, 2000);
  // setTimeout(() => {
  //   leftRotate('l-prime-btn')
  // }, 3000);
  // setTimeout(() => {
  //   upRotate('u-prime-btn')
  // }, 4000);
  // setTimeout(() => {
  //   leftRotate('l-btn')
  // }, 5000);
  // setTimeout(() => {
  //   upRotate('u-btn')
  // }, 6000);
  // setTimeout(() => {
  //   leftRotate('l-prime-btn')
  // }, 7000);



algorithmExecution(functionArray)


// setTimeout(leftRotate('l-btn'), 1000);
// setTimeout(upRotate('u2-btnless', 'double'), 2000);
// setTimeout(leftRotate('l-prime-btn'), 3000);
// setTimeout(upRotate('u-prime-btn'), 4000);
// setTimeout(leftRotate('l-btn'), 5000);
// setTimeout(upRotate('u-btn'), 6000);
// setTimeout(leftRotate('l-prime-btn'), 7000);


}, 5000);
  }
  


}


function algorithmExecution(array){
  console.log(array)
  let funcionName;
  array.forEach((move, index) =>{

    
    setTimeout(() => {

    switch(move){
case 'L':
  funcionName = 'left rotate'
  leftRotate('l-btn')
break;
case 'R':
  funcionName = 'right rotate'
  rightRotate('r-btn')
break;
case 'U':
  funcionName = 'up rotate'
  upRotate('u-btn')
break;
case 'D':
  funcionName = 'down rotate'
  downRotate('d-btn')
break;
case 'F':
  funcionName = 'front rotate'
  frontRotate('f-btn')
break;     
case 'B':
  funcionName = 'back rotate'
  backRotate('b-btn')
break;
case 'L`':
  funcionName = 'left prime rotate'
  leftRotate('l-prime-btn')
break;
case 'R`':
  funcionName = 'right prime rotate'
  rightRotate('r-prime-btn')
break;
case 'U`':
  funcionName = 'up prime rotate'
  upRotate('u-prime-btn')
break;
case 'D`':
  funcionName = 'down prime rotate'
  downRotate('d-prime-btn')
break;
case 'F`':
  funcionName = 'front prime rotate'
  frontRotate('f-prime-btn')
break;     
case 'B`':
  funcionName = 'back prime rotate'
  backRotate('b-prime-btn')
break;
case 'L2':
  funcionName = 'left double rotate'
  leftRotate('l2-btnless', 'double')
break;
case 'R2':
  funcionName = 'right double rotate'
  rightRotate('r2-btnless', 'double')
break;
case 'U2':
  funcionName = 'up double rotate'
  upRotate('u2-btnless', 'double')
break;
case 'D2':
  funcionName = 'down double rotate'
  downRotate('d2-btnless', 'double')
break;
case 'F2':
  funcionName = 'front double rotate'
  frontRotate('f2-btnless', 'double')
break;     
case 'B2':
  funcionName = 'back double rotate'
  backRotate('b2-btnless', 'double')
break;

    }

      console.log(funcionName)
    }, index*1500);
  })



}













































/*
COMPARE OBJECT MIGHT NOT BE NEEDED NOW THAT THE STRAGEGY FOR SOLVING EDGE PAIRES HAS CHANGED. 

KEEPING A COPY OF THE OBJECT STRUCTURE JUST IN CASE: 

 let comparisonObj = {
    'corner_facets': {
      'layer':F2LPair['corner_details']['main_details']['layer'],
      'alpha': F2LPair['corner_details']['main_details']['corner_piece'][1], // color 1
      'alpha_index':(F2LPair['corner_details']['main_details']['corner_piece_indexes'][1] + rotateValue)%4, // index of color 1
      'beta': F2LPair['corner_details']['main_details']['corner_piece'][2], // color 2
      'beta_index': (F2LPair['corner_details']['main_details']['corner_piece_indexes'][2] + rotateValue)%4, //index of color 2
      'vertical_edge': (F2LPair['corner_details']['main_details']['vertical_index'] + rotateValue)%4
    }, 

    'edge_facets':{
    'layer': F2LPair['edge_details']['layer'],
    'alpha':  F2LPair['edge_details']['matching_edge'][0],
    'alpha_index': F2LPair['edge_details']['vertical_edge_details']['facet_indexes'][0],
    'beta':  F2LPair['edge_details']['matching_edge'][1],
    'beta_index': F2LPair['edge_details']['vertical_edge_details']['facet_indexes'][1], //index of color 2
    'vertical_edge': F2LPair['edge_details']['edge_index']
    }

  }

*/