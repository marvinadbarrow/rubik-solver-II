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

let F2LCornersFirstLayerArray = []
let F2LCornersLastLayerArray = []



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


// test scrambles
let scramble1 = ['F', 'L', 'R2', 'B', 'U']
let scramble2 = ['B2', 'L', 'B`', 'L`', 'B2', 'L`']
let scramble3 = ['D2', 'F`', 'D', 'U2', 'L', 'R`']
let scramble4 = ['R', 'F2', 'U', 'F`', 'B2', 'L`', 'B`', 'R2`', 'U', 'B`']
const changeCubeState = (clickedButton) =>{
  let stateButton = clickedButton
  
  switch(stateButton){
    case 'scramble': console.log('scrambling cube.....')
    
    algorithmExecution(scramble4)
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
          case 1: // since only one piece is oriented correctly, leave it as it is, since the next piece will be permuted relative to the existing oriented cross piece. 
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
          // the below IF/ELSE condition can be significantly reduced in size since the only parameter that changes in the permuteTwoCrossEdges() function is the integer parameter, which gives the number of rotations from colour1 to the natural index of colour2.  So a variable can be created for the for the number of rotations to the natural index, updated when it meets a specific condition and then that variable can be passed as a parameter to the function.  
          
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
      // there must be just 'one' element in the array (because three are oriented and hence in the oriented array), representing an incorrectly oriented cross piece on the down layer. The below array will hold current index and permuted index for all four cross edge-pieces. 
  
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
  
  // to get the value for the above we need to find the sum of current indexes of all the pieces on the down layer and then subtract the sum from '6' which will give us the index missing piece, which will then be assigned the dummy piece variable
  let sumOfCurrentIndexes = 0;
  
      orientedCrossEdgeArray.forEach(edgePiece =>{ // there will be three cross edges
  console.log(edgePiece['index_in_layer'])
  // add the index of each piece to sum of current indexes
        sumOfCurrentIndexes += edgePiece['index_in_layer']
              // variable for non-white facet of cross edge-piece
      let colorFacet;
      // variable for the index at which the piece naturally sits in the down layer
  let naturalIndex; 
  // since the piece is oriented the color facet is at index '1' of the edge piece array
        colorFacet = edgePiece['cross_piece'][1]
        // assign the natural index associated with the facet color
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
  
  // the missing piece can easily be found by subtracging the sum of the indexes of the existing oriented pieces on the down layer  from '6', which is the sum of all the down layer edge indexes. The result gives the index of the possition missing a cross piece.  If you sum the natural indexes, the positions where the oriented pieces sit when the cross is solved, and subtract 'that' from 6, the result is the natural index of the missing cross piece.  So not only do we have the position of the missing a cross piece on the down layer, but also the position in which to place it, so that the cross is oriented, with the dummy piece in the position where the missing cross piece belongs. Once the cross piece is found, it can easily be inserted in the correct place without consideration of the positions of the other cross pieces.  
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

    if(currentindex > 0){// if the current index is not zero; the piece with a natural index of zero is not sitting at index zero
      // the down layer needs to rotate to the calibration so the piece that naturally sits at zero, is actually sitting at position zero.  From there the permutation of the other pieces can be compared to the permutation cases which dictate how the cube is manipulated to rearrange the cross pieces so they all sit at their natural indexes. 

      // get the difference between the natural index of the piece and the index of the position it is currently sitting at - this gives how much the down layer needs to rotate to reach calibration
      let rawRotation = naturalIndex - currentindex
      console.log('raw rotation')
      console.log(rawRotation)
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

 console.log('rotationsTocalibration')
 console.log(rotationsTocalibration)
// now (if rotations are required) apply the rotations to the current position values of the objects referencing the cross pieces
if(rotationsTocalibration > 0){


  // rotate the down layer so that the cross piece with natural index of zero is sitting at its natual index
  switch(rotationsTocalibration){
    case 1: algorithmExecution(['D'])
      break;
      case 2: algorithmExecution(['D2'])
        break;
        case 3: algorithmExecution(['D`'])
          break
  }
  array.forEach(object =>{
    // update the index of the current object to reflect the cross piece position after down layer is rotated to calibration
object['current_index'] = (object['current_index'] + rotationsTocalibration)%4

let permutationPosition = object['current_index']
// each index position on the unsolved permutation array represents one of the side-face indexes of the cube; once calibration of the down layer occurs,  if a cross piece is sitting in the wrong position, then its natural index will be different from the index position it is sitting at. This is reflected in the array by assigning the natural index of the cross piece to the position in the array that corresponds to the side-face index that the piece is sitting at. For example; if the piece sitting at the firht face, which has index '2' is the blue piece, whose natural index is '3', then unsolvedPermutationArray[2] = 3, because the piece sitting at index two on the cube should be sitting at index 3.  Only when all pieces are solved does the natural index of each piece match the index of the side face it sits at; so this will give  unsolvedPermutationArray[0] = 0,  unsolvedPermutationArray[1] = 1, etc. In other words, for 0 <= i <= 3,  unsolvedPermutationArray[i] = i.  By creating a string out of the elements in the array for the scenario where all pieces sit at their natural index, we get the string '0123'. I have called this the 'identity' permutation; where nothing needs to be done to the cross pieces, since they are already permuted correctly.  There are five other arrangements that can occur, for a total of six permutations including the identity permutation.  Each of the other five permutations is solved with a specific set of moves on the cube and a switch statement is used to identify the permutation and to call the appropriate function to execute those moves. 
unsolvedPermutationArray[permutationPosition] = object['natural_index']
  })

  console.log('unsolvedPermutationArray')
  console.log(unsolvedPermutationArray)
  //create a string out of the joined elements of the unsolved permutation array; other than the identity permutation '0123' which occurs when all cross pieces are positioned at their natural index, there are 5 permutations that can occur.  The below swwitch statement examins the permutation and evokes the function that will rearrange the pieces to have the identity permutation. 
  stringPermutation = unsolvedPermutationArray.join('').toString()
  
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

   // as there are only correctly oriented pieces in the D-layer and they are solved, check for cross pieces on the mid layer. 


   if(orientedCrossEdgeArray.length < 4){
    checkCrossPieceMidLayer()
  }else{
    // handle cross
    handleFullCross()
  }
  }else{ // piece B is not permuted correctly relative to piece A: find the distance between the correct permutation position and position of 'B'
rawRotation = permuted - B


// if the rotation direction is negative value
if(rawRotation < 0){
//adding 4 to a negative number of rotations gives the required number of forward rotations
  rotationsToPermuted = rawRotation + 4
}else if(rawRotation > 0){ // otherwise the rotation direction is positive
  // otherwise the number of rotations is positive; use the raw rotation value
  rotationsToPermuted = rawRotation
}

// switch the number of rotations to permuted so the down layer can receive the correct number of turns to receive the second piece
// the down layer is timed to occur between the two 'side-face' turns; because the down layer receives the cross piece, it is a given that this is the layer we are turning. On the other hand, the side-face needs to be determined because it could be any one of the four faces vertical faces on the cube. 

// creating three variables, one for each of the three moves needed to place the permuted cross piece. 
let firstMove;
let secondMove;
let thirdMove;

// create an array to hold the algorithm made up of three moves
let algoArray = []
  switch(rotationsToPermuted){
    case 1: // just one forward rotation so just the d-btn string
    secondMove = 'D'
    break;
    case 2:// a double rotation
    secondMove = 'D2'
    break;
    case 3: // three rotations can be achieved by doing one prime rotation of the same face
    secondMove = 'D`'
    break;
    }



// switch edge_name parameter to determine which edge needs to be rotated. 
switch(edge_name){
  case 'down-right': //  double rotate the right face
  firstMove = 'R2'
  thirdMove = 'R2'
    break;
    case 'down-left': // double rotate the left face
    firstMove = 'L2'
    thirdMove = 'L2'
      break;
      case 'down-front': // PIECE IS ON FRONT FACE
      firstMove = 'F2'
      thirdMove = 'F2'
        break;
        case 'down-back': // double rotate the back face
        firstMove = 'B2'
        thirdMove = 'B2'
          break;
}

// send algorithm to algorithm execution function
algoArray = [firstMove, secondMove, thirdMove]
    // check result

    setTimeout(() => {
      // whenever the current function executes, it's because two correctly oriented cross pieces were found on the down layer.  So the handle full cross is not necessary here because this function would not run if there are more than two solved cross pieces - what needs to happen is that the mid layer needs to be checked after two pieces have been permuted. 
      checkCrossPieceMidLayer
    }, 7000);




  }

}



function checkNonOrientedCrossPieces(){
  console.log('checking non oriented cross pieces')
  // clear the array for a new representation of unoriented cross edges
notOrientedCrossEdgeArray = []
  let notOrientedCrossPieces = 0;

  // creating three variables, one for each of the three moves needed to place the permuted cross piece. 
let firstMove;
let secondMove;
let thirdMove;

let algoArray = []
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
      let childIndex = notOrientedCrossEdgeArray[0]['index_in_layer']

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
                console.log('how many oriented cross pieces')
                console.log(orientedCrossEdgeArray.length)
                checkCrossPieceMidLayer()
              }else{
                console.log('cross should be finished - number of oriented pieces')
                console.log(orientedCrossEdgeArray.length)
                // handle cross
                console.log('handle cross')
                handleFullCross()
              }
  }, 5000);


}else{ // the piece can be inserted without consideration for disturbing other pieces
  // use the index to determine the face the white facet sits on, and then rotate relevant faces to get the piece into the first layer oriented correctly - permutation can be checked afterward (if the array containing cross piece objects has entries), if necessary. 

switch(childIndex){
  case 0: // white facet is on back face
firstMove = 'B';
 secondMove = 'D`';
 thirdMove = 'R';
    break;
    case 1: // white facet is on left face
    firstMove = 'L';
 secondMove = 'D`';
 thirdMove = 'B';
      break;
      case 2: // white facet is on front face
      firstMove = 'F';
      secondMove = 'D`';
      thirdMove = 'L';
        break;
        default: // otherwise white facet is on right face
        firstMove = 'R';
        secondMove = 'D`';
        thirdMove = 'F';
      
  }
  // additions to the down layer with cross pieces may or may not have resulted in the all cross pieces being on the down layer, check for this and if this is so, then handle the cross, otherwise check other layers for the other cross pieces. 

  algoArray = [firstMove, secondMove, thirdMove]
  algorithmExecution(algoArray)

setTimeout(() => {
  updateLayer1CrossEdges()
            if(orientedCrossEdgeArray.length < 4){
              checkCrossPieceMidLayer()
            }else{
              // handle cross
              handleFullCross()
            }
}, 6500); // the algorithm takes 4.5 seconds to execute with the extra 1.5 seconds for the acknowledgement that the process is ended - a total of 6 seconds. So a  half-second is added as a delay before the check for the cross condition can be checked. 
}
    }else{ // all cross pieces must be oriented; update the layer- check the cross condition and handle full cross or check mid layer for cross pieces, whichever is required. 


updateLayer1CrossEdges()
            if(orientedCrossEdgeArray.length < 4){
              checkCrossPieceMidLayer()
            }else{
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
  // console.log('... checking mid layer for cross pieces...')
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
        // console.log(`cross pieces on middle layer: ${crossPieces}`)

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

}else{
   whiteFacetFace = childCrossEdge['piece_position'][1] // white is at L/R face
  childColor = childCrossEdge['cross_piece'][0] // child color facet must be at index zero
  childIndex = childCrossEdge['facet_indexes'][0] // child facet 'face-index' must be at position 0 in the facet_indexes array
  
 
}

// updated information about cross pieces on the down layer for the next step. 
updateLayer1CrossEdges()
// now, if there are cross pieces on the down layer
       if(orientedCrossEdgeArray.length > 0){

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


// DETERMINE MASTER COLOR
if(masterColor  == 'o'){ // colour is ORANGE
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
  // clear previous array values for new cross pieces if found
  lastLayerCrossEdgesArray = []

  // temporary array to hold moves for algorithm executor
  let tempAlgArray = []
// console.log('checking last layer from white cross edge pieces... ')

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

// push cross piece to LL array
lastLayerCrossEdgesArray.push({
'index': index,
'facet_indexes': facetIndexes,
'cross_piece': edge, 
'piece_position':crossPiecePosition
})}
})

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

 // CHCK PIECE ORIENTATION TO SEE WHETHER IT CAN BE INSERTED DIRECTLY OR NOT
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

// variable for parameter which details the number of moves from the master color index to the natural index of the secondary color
let distanceToPermuted;
// switch master color and determine child colour, then send, as parameters to the 'place last layer cross piece' function, master and child index, number of rotations from master index to permuted child index, oriented status of cross piece, and the name of the side-face that the cross piece sits on. 

if(masterColor  == 'o'){ // colour is ORANGE
  if(childColor == 'g'){ // colour 2 is 'GREEN'
  distanceToPermuted = 3;
  }else if(childColor == 'r'){ // colour is RED 
    distanceToPermuted = 2;
  }else{ // the remaining colour must be BLUE
    distanceToPermuted = 1;
            }
  }else if(masterColor == 'b'){ 
    // colour is RED
    if(childColor == 'o'){ // colour 2 is 'ORANGE'
  distanceToPermuted = 3;
    }else if(childColor == 'g'){ // colour is GREEN 
    distanceToPermuted = 2;
    }else{ // the remaining colour must be RED
    distanceToPermuted = 1;
    }
  }else if(masterColor == 'r'){
     // colour is RED
    if(childColor == 'b'){ // colour 2 is 'BLUE'
  distanceToPermuted = 3;
    }else if(childColor == 'o'){ // colour is ORANGE 
    distanceToPermuted = 2;
    }else{ // the remaining colour must be GREEN
    distanceToPermuted = 1;
    }
  }else{
    // colour must be GREEN
    if(childColor == 'r'){ // colour 2 is 'RED'
  distanceToPermuted = 3;
    }else if(childColor == 'b'){ // colour is BLUE 
    distanceToPermuted = 2;
    }else{ // the remaining colour must be ORANGE
    distanceToPermuted = 1;
    }
  }
 // now all data is collected
  placeLastLayerCrossPiece(masterIndex, childIndex, distanceToPermuted, oriented, childPosition)

}else{   console.log('there are no cross pieces on the down layer')
  // there are no oriented cross pieces on the down layer, so the last layer cross piece can be inserted without a permutation check - either just doing a double rotation on the side-face, if 'oriented === true', or a single forward rotation of the side-face and then a prime rotation of the face at index '(side-face index + 1)%4', if 'oriented === false'. 
  if(oriented === true){ // the white facet is on the up-face
    switch(childPosition){
      case 'back': // double rotate back
tempAlgArray = ['B2']
        break;
        case 'left': // double rotate left
        tempAlgArray = ['L2']
          break;
          case 'front': // double rotate front
          tempAlgArray = ['F2']
            break;
            default: // this must be the right face - double rotate right
            tempAlgArray = ['R2']
    }
// send move for execution
algorithmExecution(tempAlgArray)
    // since there were initially no pieces on the down layer, we know that there is a piece on the layer now and there's no need to check it; move onto the mid layer check
    setTimeout(() => {
      checkNonOrientedCrossPieces()
    }, 1500);

  }else if(oriented === false){ // white facet is side facing so more than on move is required

    switch(childPosition){
      case 'back': // single rotate back, followed by left prime
     tempAlgArray = ['B', 'L`']
        break;
        case 'left': // single rotate left, followed by front prime
    tempAlgArray = ['L', 'F`']
          break;
          case 'front': // single rotate front, followed by right prime
    tempAlgArray = ['F', 'R`']
            break;
            default: // this must be the right face - single rotate right, followed by back prime
    tempAlgArray = ['R', 'B`']
    }
  // execute algorithm function
  algorithmExecution(tempAlgArray)
setTimeout(() => {
  updateLayer1CrossEdges()
  if(orientedCrossEdgeArray.length < 4){
    checkNonOrientedCrossPieces()
  }else{
    handleFullCross()
  }
}, 4000);
  }else{
    // something is wrong; there is no orientation information on the last layer cross piece
    console.log('there is no orientation information on the child cross piece')
alert('there is no orientation information on the cross piece, check the console')
    updateLayer1CrossEdges()
  }
}
}else{
  // no cross pieces on last layer
  updateLayer1CrossEdges()
  if(orientedCrossEdgeArray.length < 4){
    checkNonOrientedCrossPieces()
  }else{
    // handle cross
    handleFullCross()
  }
}
}


// placing a lasts layer cross piece into down layer oriented and permuted. 
function placeLastLayerCrossPiece(masterIndex, childIndex, permuteDistance, orientation, side_face){
 // variable for calculating the time it takes for the algorithm to complete (number of moves x 1500 milliseconds) so that post algorithm checks for update of piece positions occur after the moves. 

  let firstMove;
let secondMove;
let thirdMove;
let algoArray = []
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
      algoArray = ['B2']
    }else if(side_face == 'left'){
      algoArray = ['L2']
    }else if(side_face == 'front'){
      algoArray = ['F2']
    }else{ // side-face must be right
      algoArray = ['R2']
    }   
    // EXECUTE double rotation
    algorithmExecution(algoArray)

    setTimeout(() => {
      updatedCrossCheck()
    }, 2000);


break;
default://cross piece is oriented such that more than one move is required to enable placement to the correctly permuted position. 
if(side_face == 'back'){
  firstMove = 'B'
  secondMove = 'D'
  thirdMove = 'L`'
}else if(side_face == 'left'){
    firstMove = 'L'
    secondMove = 'D'
    thirdMove = 'F`'
}else if(side_face == 'front'){
firstMove = 'F'
secondMove = 'D'
thirdMove = 'R`'
}else{ // side-face must be right
firstMove = 'R'
secondMove = 'D'
thirdMove = 'B`'
}
// collect three moves into the algo array and send to algorithm execution function
algoArray = [firstMove, secondMove, thirdMove]
algorithmExecution(algoArray)

setTimeout(() => {
updatedCrossCheck()
}, 6000);
   }
 
 }, 1000);
// run and check for non oriented pieces on the down layer now that a pass of all levels of the cube has been made

}else{ // the cross piece is not at the correctly permuted index. So before it can be placed the down layer needs to be rotated the appropriate distance

   rawRotation = permutedIndex - childIndex

  if(rawRotation < 0){ // adjust negative rotational values for forward rotation
    rotationsToPermuted = rawRotation + 4
  }else{ // raw rotation is already positive so use the original rotation for rotations to permuted 
    rotationsToPermuted = rawRotation
  }

  // DETERMINE DOWN LAYER ROTATION WHICH WILL CORRECT ITS POSITION READY TO HAVE CROSS PIECE INSERTED
  setTimeout(() => {
    // switch rotations to permuted to see how many rotations are required
switch(rotationsToPermuted){
case 1:
firstMove = 'D'
break;
case 2:
firstMove = 'D2'
break;
default: // this value must be 3, since there are only three possible rotation positions if the child cross piece is not permuted correctly. D prime is the same as D3
firstMove = 'D`'
}

  // now down rotation is figured out,  so that  childIndex === rotationsToPermuted will be achieved, the orientation of the cross piece needs checking 

  switch(orientation){
    case true: // cross piece is oriented such that it can be placed directly to the correctly permuted position, in one move.  Combine the first move, the down rotation that results in childIndex === rotationsToPermuted, with the move required to insert the cross piece from the last layer, into the temporary algorithm array 
    if(side_face == 'back'){
      algoArray = [firstMove, 'B2']
    }else if(side_face == 'left'){
      algoArray = [firstMove, 'L2']
    }else if(side_face == 'front'){
      algoArray = [firstMove, 'F2']
    }else{ // side-face must be right
      algoArray = [firstMove, 'R2']
    }

    // send array containing rotations, to the algorithm executor
    algorithmExecution(algoArray)
        // update cross check - two moves take 3 seconds so wait four seconds before check
        setTimeout(() => {
          updatedCrossCheck()
          }, 4000);
break;
default://cross piece is oriented such that more than one move is required to enable placement to the correctly permuted position.   Combine the first move, the down rotation that results in childIndex === rotationsToPermuted, with the move required to insert the cross piece from the last layer, into the temporary algorithm array 
if(side_face == 'back'){ // side-face is back
algoArray = [firstMove, 'B','D', 'L`']
}else if(side_face == 'left'){ // side face is front
  algoArray = [firstMove, 'L','D', 'F`']
}else if(side_face == 'front'){ // side-face is front
  algoArray = [firstMove, 'F','D', 'R`']
}else{ // side-face must be right
  algoArray = [firstMove, 'R','D', 'B`']
}

    // EXECUTE algorithm with temp array
    algorithmExecution(algoArray)
    // update cross check  - four moves take 6 seconds so wait seven seconds before checking the updated cross
    setTimeout(() => {
      updatedCrossCheck()
      }, 7000);

   } // END OF SWITCH
 }, 1000);


}



// function to update cross and check; if all pieces are on down layer then handle the full cross, otherwise check for non oriented cross pieces on the down layer. 
function updatedCrossCheck(){
  updateLayer1CrossEdges()
  setTimeout(() => {
    if(orientedCrossEdgeArray.length < 4){
      checkNonOrientedCrossPieces()
    }else{
      handleFullCross()
    }
  }, 500);

}
}



// ALL THE  UPDATES CAN HAPPEN AFTER ALGORITHMS


 // function switches permutation of cross pieces to determine which set of moves are needed to solve the permutation. 
  function fullCrossPermutations(permutation){
console.log(permutation)
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
    tempAlgArray = ['R2','D', 'R2','D`', 'R2']
algorithmExecution(tempAlgArray)

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
    tempAlgArray = ['L2','D`', 'L2','D', 'L2']
algorithmExecution(tempAlgArray)

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
            console.log('handling full cross')
          }
          },8500);
  } // tested and working

  function crossPermutation0231(){
    console.log('0231 permutation')
console.log('downLayerEdges')
console.log(downLayerEdges)
    setTimeout(() => {
      let tempAlgArray = []
      tempAlgArray = ['R2','D`', 'R2','D', 'R2','D']
      algorithmExecution(tempAlgArray)
      
    }, 1000);


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
          },11000);
  } // tested and working

  function crossPermutation0312(){
    let tempAlgArray = []
    tempAlgArray = ['L2','D', 'L2','D`', 'L2','D`']
algorithmExecution(tempAlgArray)


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
    tempAlgArray = ['L2','D2', 'L2','D2', 'L2']
algorithmExecution(tempAlgArray)


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
setTimeout(() => {
  findF2LcornersFirstLayer([])
}, 1500);

  }// tested and working





function findF2LcornersFirstLayer(solvedEdges){
  // console.log('cross is complete, begin F2L solve...')
  // clear F2L arrays for new search
  F2LCornersFirstLayerArray = []

console.log('array containing solved edges of the cube (the vertical indexes at which the edges sit)')
console.log(solvedEdges)

// the array argument will either be an empty array, if this is the first search for a corner piece, which occurs after the cross is complete, or will have entries representing any F2L pieces already solved.  This information is necessary otherwise an infinite loop might start where the corner pieces of already solved F2L pieces will not be recognized as having already been solved and will likely evoke a solve again.  

  // BEGIN BY CHECKING THE NUMBER OF ELEMENTS IN THE ARRAY, IF IT IS 4 THEN THE FUNCTION SHOULD NOT RUN BECAUSE THE F2L STAGE IS ALREADY COMPLETE. 
 

  if(solvedEdges.length > 3){ // there are four solved edges so the F2L state is complete
    console.log('F2L stage is complete, initiate OLL stage...')
  }else{
    console.log('F2L stage incomplete, searcing for more F2L corner pieces...')

  setTimeout(() => {
    // SEARCH FIRST LAYER FOR F2L CORNERN PIECES
    downLayerCorners.forEach((downCorner, downIndex) =>{

      // if the array for solved indexes contains at least one element, and includes the current index, the current corner piece should be ignored; 
    if(solvedEdges.length > 0 && solvedEdges.includes(downIndex)){ // the edge is solved, so the corner must be part of the solved F2L pair.
      console.log(`this edge is already solved at index: ${downIndex}`)
      console.log(downCorner)
    }else{ // if this condition fails,  either the array is empty (which will be the case if this is the first instance of this function execution after the cross is complete), or the array does not include the index of the current corner piece. 


      if(downCorner[0] == 'w' || downCorner[1] == 'w' || downCorner[2] == 'w'){
        console.log('F2L corner piece found')
console.log(downCorner)
        // if any one of the facets on the corner piece is white, create a 'word' description of the vertical edge the corner sits on and an array witht he index positions of the faces the corner facets are part of

// for index values of facets on the corner piece 
let cornerFacetIndexes;
// for names of faces the vertical edge sits between
let verticalEdgeName;

// for position names of each facet (the face name)
let facetPositionNames;
        switch(downIndex){
case 0: verticalEdgeName = ['back', 'left']
cornerFacetIndexes = [5, 0, 1] 
facetPositionNames = ['down', 'back', 'left']
break;
case 1: verticalEdgeName = ['front', 'left']
cornerFacetIndexes = [5, 2, 1]
facetPositionNames = ['down', 'front', 'left']
break;
case 2: verticalEdgeName = ['front', 'right']
cornerFacetIndexes = [5, 2, 3]
facetPositionNames = ['down', 'front', 'right']
break;
default: verticalEdgeName = ['back', 'right']
cornerFacetIndexes = [5, 0, 3]
facetPositionNames = ['down', 'back', 'right']
        }

// create an object for the corner, with corner array (holding the facet colors), the corner index, the edge description and the indexes of the corner facets.  Push the object to the array holding first layer F2L corners. 
        F2LCornersFirstLayerArray.push({
          'vertical_index': downIndex, 
          'facet_position_names':facetPositionNames,
          'corner_piece':downCorner,
          'corner_piece_indexes': cornerFacetIndexes,
          'vertical_edge_name': verticalEdgeName,
          'layer': 1
        })
  


        }


    } // end of ELSE condition where the current corner piece was not a solved piece, so was processed
              })





        // the next thing to do is determine the non-white colours of the corner piece. 
        // after that is done, then a search needs to be made for the edge piece matching the two non-white colours of the corner piece

  }, 1000);

  }

setTimeout(() => {
          // AFTER, the loop through the first layer, check if an F2L corner piece been recorded in the array for the pieces
          if(F2LCornersFirstLayerArray.length > 0){
            console.log(F2LCornersFirstLayerArray)
            // if at least one F2L corner is recorded, send the array for assessment. 
            assessF2LCornerPiece(F2LCornersFirstLayerArray)
            console.log('looking for another F2L corner piece')
          }else{ // otherwise no F2L corner piece was found; run LAST LAYER search for corner pieces
          console.log('no further F2L corners were found on the first layer')
          findF2LcornersLastLayer()
          }
}, 2000);



}


function intermediateTestFunction(word){
  console.log(word)

}




function findF2LcornersLastLayer(){
  // clear F2L array for new check
  F2LCornersLastLayerArray = []
console.log('check last layer for F2L corner pieces')
   // no F2L corner pieces found on the first layer
          
    // SEARCH LAST LAYER FOR F2L CORNER PIECES - note that, an F2L corner piece on the up layer cannot be in the solved position, so there is no need to check if the index is in the array for solved pieces.  the corner piece might be at a vertical index that is already solved, but only because the piece sits at the top of the vertical edge, on top of an already solved F2L pair, the discovered corner on the up layer belongs somewhere else so it is eligible for assessment. 
    upLayerCorners.forEach((upCorner, upIndex) =>{


      // if an F2L corner is found. 
      if(upCorner[0] == 'w' || upCorner[1] == 'w' || upCorner[2] == 'w'){

// assign edge description and facet indexes
            let verticalEdgeName;
            let cornerFacetIndexes;
            let facetPositionNames;
            switch(upIndex){
    case 0: verticalEdgeName = ['back', 'left']
    cornerFacetIndexes = [0, 0, 1]
    facetPositionNames = ['up', 'back', 'left']
    break;
    case 1: verticalEdgeName = ['front', 'left']
    cornerFacetIndexes = [0, 2, 1]
    facetPositionNames = ['up', 'front', 'left']
    break;
    case 2: verticalEdgeName = ['front', 'right']
    cornerFacetIndexes = [0, 2, 3]
    facetPositionNames = ['up', 'front', 'right']
    break;
    default: verticalEdgeName = ['back', 'right']
    cornerFacetIndexes = [0, 0, 3]
    facetPositionNames = ['up', 'back', 'right']
            }

// create an object for the corner, with corner array (holding the facet colors), the corner index, the edge description and the indexes of the corner facets.  Push the object to the array holding last layer F2L corners. 
            F2LCornersLastLayerArray.push({
              'vertical_index': upIndex,
              'corner_piece':upCorner,
              'facet_position_names': facetPositionNames,
              'corner_piece_indexes':cornerFacetIndexes,
              'vertical_edge_name': verticalEdgeName,
              'layer': 3
            })
             }




        })

  // there MUST be white corners on the last layer if none were found on the first layer
if(F2LCornersLastLayerArray.length > 0){
  console.log('F2L corner piece found on last layer')
  console.log(F2LCornersLastLayerArray)
  assessF2LCornerPiece(F2LCornersLastLayerArray)
  }else{
    // logically this scenario should not occur because the last layer check can only occur if the first layer check doesn't find any unsolved corner edges; if no unsolved corners are found on either layer, this has to mean that the number of solved edges is 4, so the check on the last layer should never happen.  This is here for debugging purposes. 
  console.log('no F2L unsolved corner pieces were found on the last layer')
  
  }


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



/*


SPARE MID LAYER REQUIREMENTS

((edge[0] == cornerObject['edge_requirements']['default_edge'][0] && edge[1] == cornerObject['edge_requirements']['default_edge'][1]) || (edge[1] == cornerObject['edge_requirements']['default_edge'][0] && edge[1] == cornerObject['edge_requirements']['flipped_edge'][1]))


*/




// search for the matching F2L edge piece
function seekMatchingEdgesF2L(cornerObject){
  console.log('checking mid layer edges')
  console.log('cornerObject')
  console.log(cornerObject)
  // variable for number of edges
  let numberOfEdges = 0;
// array for matching edge
let matchingPairArray = []
let midMatchingEdge;
let upMatchingEdge
// object for matching edge full details incluing positional details, in words, and index details of each facet on the edge. 
let edgeDetails;
// search layers 2 and 3 for the edge piece. 
midLayerEdges.forEach((edge, indexOfVerticalEdge) =>{ // if the edge is found, log and attribute the apppropriate variable
  // log any edges found on the mid layer
  console.log('logging mid layer edges')
  console.log(edge)
  // if the default edge default or flipped edge of the corner piece matches an edge piece on the mid layer
  if(cornerObject['edge_requirements']['default_edge'].includes(edge[0]) && cornerObject['edge_requirements']['default_edge'].includes(edge[1])){
    // assign the edge the matchingEdge variable
    console.log('matching facets found')
    console.log(cornerObject['edge_requirements']['default_edge'][0])
    console.log(cornerObject['edge_requirements']['default_edge'][1])
    midMatchingEdge = edge
    console.log('edge found on mid layer - matching edge')
    console.log(midMatchingEdge)
    numberOfEdges ++;
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
      'matching_edge': midMatchingEdge, 
      'edge_index':indexOfVerticalEdge, 
      'vertical_edge_details':edgeDetails
    }

    console.log('edge object on mid layer')
    console.log(edgeObject)
    console.log('cornerObject')
    console.log(cornerObject)



    let  F2LPairObj = {
      'corner_details': cornerObject,
      'edge_details': edgeObject

    }
    console.log('F2LPairObj')
    console.log(F2LPairObj)  
    matchingPairArray.push(F2LPairObj)

  }
})

if(numberOfEdges > 0){
  joinMatchingPair(matchingPairArray[0])
// SEARCH LAST LAYER, ONLY IF A MATCHING EDGE WAS NOT FOUND ON THE MID LAYER

}else{
  console.log('checking up layer edges FOR F2L edge piece')
  // then no matching edge was found on the first layer - check the last layer
  upLayerEdges.forEach((upEdge, indexOfEdge) =>{
console.log('currently examined edge')
  console.log(upEdge)
    if(cornerObject['edge_requirements']['default_edge'].includes(upEdge[0]) && cornerObject['edge_requirements']['default_edge'].includes(upEdge[1])){
         // assign the edge the matchingEdge variable
         upMatchingEdge = upEdge
    console.log('edge found on up layer')
    console.log('this is the matching edge')
   console.log(upMatchingEdge)

    // create an object for the matching edge and associated vertical edge
    let edgeObject = {
      'layer': 3,
      'matching_edge': upMatchingEdge, 
      'edge_index':indexOfEdge, 
      'vertical_edge_details':'N/A'
    }
    // create a new object and include the matching edge; the object now has the F2L pair
   let  F2LPairObj = {
    'corner_details': cornerObject,
    'edge_details':edgeObject
      }

      // push matching pair details to array
      matchingPairArray.push(F2LPairObj)
  
  }})
  joinMatchingPair(matchingPairArray[0])
}

}





function joinMatchingPair(F2LPair){
  console.log('joining matching pair')
console.log(F2LPair)
// variable for rotational value for down face
let rotateValue
// first step is to check the difference between the edge piece index and the corner piece index
// have decided to subtract the edge from the corner, so that, if the result is positive,  the edge index is greater than the corner index, so the corner needs to rotate forward/clockwise to reach the edge piece, otherwise the the edge index is less than the corner index so the corner needs a prime move (or its forward equivalent) to reach the edge piece
let pairIndexDifference = F2LPair['edge_details']['edge_index'] - F2LPair['corner_details']['main_details']['vertical_index']
console.log('pairIndexDifference')
console.log(pairIndexDifference)
// check the value

// correction for negative numbers
if(pairIndexDifference < 0){
  rotateValue = pairIndexDifference + 4
}else{rotateValue = pairIndexDifference}

// after the rotational value is calculated, switch the value to  determine the down face rotation required to join the matching pair

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
 
  console.log('check corner layer')
  console.log(cornerLayer)
  console.log('check edge layer')
  console.log(edgeLayer)



// the object is working fine: now, the conditions have to be set for how the F2L pair is configured so that the algorithm can be chosen.  Use say,  'a' and 'b' for indexes, and, 'x' and 'y' for colours and work out the combinations. then the whole process needs to repeat for all four F2L pairs. // but also  other types of cases need handling.  1) corner on last layer and edge on mid layer, 2) corner on bottom and edge on last layer, 3) both corner and edge on last layer. The final case might have additional difficulties since, there is no real reference vertical edge for those cases, because neither of the pieces are locked into a vertical edge, both being on the last layer. This issue can actually be solved by rotating the corner piece to the vertical edge where it sits naturally as part of a solved F2L pair. 


//determine if the piece sits upright or is inverted; this is independent of the orientations of the individual F2L pieces so can be calculated outisde of the conditions for determining the orientation of corner and edge pieces of the F2L pair.   The sum of the two layers will result in one of four numbers, 3, 4, 5 or 6.  Decided not to go for the upright vs inverted pairs, but to use the system mentionen in the console logs below - the sum value will still be used because it indicates the positions of the corner and edge pieces. as shown in the below switch statement
let F2LPairOrientation = cornerLayer + edgeLayer



// the orientation value below tells whether the piece is upright on the vertical edge layer(1+2), upside-down on the vertical edge layer(2+3), not in a vertical edge but lying horizontal, layer(3+3) or, separated by the mid layer where the corner is on layer 1 and the edge is on layer 3, layer(1+3). The set of orientation values are {3, 4, 5, 6}; each value is used together with the indexes of each peace to understand how they are positioned relative to each other and, if not joined, what moves are required to join them, and then how to position them in the last layer ready for solving. 
console.log('orientation value')
console.log(F2LPairOrientation)



    // NOTE: AT THIS POINT, it is not expected that the pair already be joined. If the pieces are not already joined, and if the edge piece is on the mid layer then this will require a down rotation for a corner piece in the down layer or an up rotation if the corner piece is on the last layer, in order for the two pieces to be joined. in other words, for orientation 5, rotate the last layer to the required location or, rotate the down layer if the orientation is 3. then move the joined F2L pair into the last layer so that it lies horizontally

    // NOTE 2: I've decided that the best way to solve separated pieces is not to solve them at the location where they are found, but to move corner pieces ,such that it joins the edge on the top layer.  Only AFTER this is done, will we assess the rotation of corner pieces, the orientation of edge pieces, and their absolute distance of the corner piece from its natural vertical index - the vertical edge facet indexes will not be needed. 

    let firstMoveDown;
let secondMove;
let thirdMove;
let lastDownMove;


    // for determining how to rotate an F2L pair on a specific vertical edge up to the the last layer, use the index of the vertical edge as a guide; if the vertical index is 'x', then a clockwise rotation of the face at index 'x + 1' will move the F2L pair into the last layer.  then, the last layer will rotate or prime rotate depending on the orientation of of the F2L pair.  If the pair was a layer 1/2 pair then a clockwise rotation of the last layer is needed, otherwise if the pair was a layer 2/3 pair, it is inverted, so a last layer prime rotation is required.  The orientation is already given in the case that determines how a pair is joined. 
let edgeIndex = F2LPair['edge_details']['edge_index']


    switch(F2LPairOrientation){
      case 3: // orientation is upright
       console.log(`
      EDGE: layer 2
      CORNER: layer 1
      rotate down layer to pair the pieces - then execute the appropriate rotations to move the pair to the last layer and to position it at the correct vertical index for solving`)
// DOWN ROTATIONS: rotate value gives the number of rotations needed; last move is just the reverse of the first move, to undo the down rotation so that the cross is permuted again. 

        switch(rotateValue){
          case 0:
            firstMoveDown = 'N/A'
            lastDownMove = 'N/A'
            break;
          case 1: 
          // downRotate('d-btn')
          firstMoveDown = 'D'
          lastDownMove = 'D`'
            break;
            case 2: 
            // downRotate('d2-btnless', 'double')
            firstMoveDown = 'D2'
            lastDownMove = 'D2'
              break;
              case 3:
              //  downRotate('d-prime-btn')
               firstMoveDown = 'D`'
               lastDownMove = 'D'
                break
                // whichever rotation is used will need to be reversed once the pair is joined and moved to the last layer
        }
 
      // HERE WE NEED TO EXECUTE MOVES TO GET THE F2L PAIR OUT OF THE WAY UP INTO THE LAST LAYER, AND IN ORDER THAT THE DOWN LAYER CAN BE RESET TO THE SOLVED POSITION.   This depends on the exact position of the piece which will have to be switched; 
      setTimeout(() => {
        let tempAlgArray = []
//    SWITCH THE VERTICAL INDEX OF THE EDGE
        switch(edgeIndex){

          case 0:
            tempAlgArray = [firstMoveDown,'L','U', 'L`', lastDownMove]
        algorithmExecution(tempAlgArray, 'F2L')
            console.log('UPRIGHT F2L PAIR MOVED FROM BACK-LEFT EDGE TO LAYER 3')


            break;
            case 1:
              tempAlgArray = [firstMoveDown,'F','U', 'F`', lastDownMove]
              algorithmExecution(tempAlgArray, 'F2L')
              console.log(tempAlgArray)
              console.log('UPRIGHT F2L PAIR MOVED FROM FRONT-LEFT EDGE TO LAYER 3')

              break;
              case 2:
                tempAlgArray = [firstMoveDown,'R','U', 'R`', lastDownMove]
                algorithmExecution(tempAlgArray, 'F2L')
                console.log('UPRIGHT F2L PAIR MOVED FROM FRONT-RIGHT EDGE TO LAYER 3')


                break;
                default: // vertical edge index is 3
                tempAlgArray = [firstMoveDown,'B','U', 'B`', lastDownMove]
                algorithmExecution(tempAlgArray, 'F2L')

                console.log('UPRIGHT F2L PAIR MOVED FROM BACK-RIGHT EDGE TO LAYER 3')
        }
      }, 2600);

     // UNDO DOWN LAYER MOVEMENTS
setTimeout(() => {

  // AFTER MOVES HAVE BEEN MADE - CHECK RESULTS
  // where the corner should have landed on the last layer

  console.log('F2L pair')
  console.log(F2LPair)
  let F2LCorner;
  let F2LEdge;
  let newCornerIndex;
  let newEdgeIndex
  // get corner from new position
  upLayerCorners.forEach((upCorner, upIndexCorner) =>{
    console.log('logging each F2L corner to see that we have the correct orientation')
    console.log(upCorner)
    // IF THE CHECKED CORNER HAS THE SAME TWO COLOUR FACETS AS THE F2L EDGE
    if(upCorner.includes(F2LPair['edge_details']['matching_edge'][0]) && upCorner.includes(F2LPair['edge_details']['matching_edge'][1]) && upCorner.includes('w') ){
      // grab the corner in its new position
     F2LCorner = upLayerCorners[upIndexCorner]
     // get the corner's new vertical edge index (same as the corner index)
     newCornerIndex = upIndexCorner
    }
  }
    )

  // get new edge position
    upLayerEdges.forEach((upEdge, upIndexEdge) =>{
      // if the examined edge has the same two facets as the F2L EDGE
      if(upEdge.includes(F2LPair['edge_details']['matching_edge'][0]) && upEdge.includes(F2LPair['edge_details']['matching_edge'][1]) ){
        // grab the new edge
        F2LEdge = upLayerEdges[upIndexEdge]
        // grab the new edge index (this is not a vertical edge index as before but an up index)
        newEdgeIndex = upIndexEdge
      }
    }
      )

// let testIndex = edgeIndex - 1
// let newCornerIndex;
// if(testIndex < 0){
// newCornerIndex = testIndex + 4
// }else{
//   newCornerIndex = testIndex
// }

console.log('new index position of corner')
      console.log(newCornerIndex)

  // check to see if this index can be used on upLayerCorners to identify corner's new position. 


      // if the move of the F2L pair to the last layer required a clockwise side-face and last layer move, then the index of the moved F2L 'edge' piece in the upLayerEdges, will be the same as the vertical index of the edge prior to its movement. Example; if the edge piece is upright at the vertical index 3 (back/right), then the moves B,U will move the corner to vertical index 2 (as above), but given that the F2L pair is neither upright nor inverted once moved, but laid flat, the edge of the pair is no longer part of a vertical edge.  The uplayerEdges must be used to find the position of the edge piece.  In this case the new index of the edge piece (as it sits in upLayerEdges) is the same as the its vertical index edge prior to the move.  Therefore the edge piece's index is 3.  This is for an upright pair.  For the inverted pairs, anticlockwise side-face and last layer moves are required; the new index of the edge piece in upLayerEdges will be its previous vertical edge index + 1.  The new vertical index position of the corner will also be the previous vertical edge index + 1. 

      // variable for F2L edge facets
 
      console.log('F2LEdge - checking that the edge was located at new position')
      console.log(F2LEdge)
      // variable for F2L corner facets

      console.log('F2L  - checking that the corner was located at new position')
      console.log(F2LCorner)
      
      // send updated edge and corner facet information for pair to be solved and inserted. 
solveF2LPair(F2LCorner, F2LEdge, newCornerIndex, newEdgeIndex)


}, 7900);



      break;
      case 4: console.log(`
      EDGE: layer 3
      CORNER: layer 1
      rotate the edge to the face whose position is 'cornerIndex + 1', then execute a clockwise move on the face that shares the index corner piece index, then use a U' rotation to join the two pieces and do a face-prime on the original move. 
    `)
console.log(F2LPair)
// to join the edge two pieces on the last layer, which is the required scenario before the solve algorithm can be executed, first check which vertical edge the corner sits on. From there, a decision can be made regarding which face to rotate to move the corner piece to the last layer. Pick the face that requires a forward rotation. Then, get the index of the face, and of the F2L edge piece on the top layer, calculate the difference between the indexes so the last layer can be rotated such that the edge piece sits on the same face, one of the two faces straddled by the vertical edge containing the corner piece, that will be rotated to move the corner piece up to the first layer. Rotating the face will cause the edge to rotate down to the mid layer and the corner piece to rotate up to the last layer.  A U rotation of the last layer will join the pieces, then a prime rotation of the side face (to undo its initial rotation) will bring both pieces to the last layer, after which, the same process that is used to move an F2L pair to the correct vertical index can be used on the pair; then the pair configuration can be assessed and the pair can be solved and inserted. 


// get index of corner
let CornerVerticalIndex = F2LPair['corner_details']['main_details']['vertical_index']
// original index of the edge
let edgeCurrentIndex = F2LPair['edge_details']['edge_index'] 
// the position the edge needs to be moved to for the join to work (use both current and destination index to figure out how much to turn the F2L edge to the correct destination)
let edgeDestination = (CornerVerticalIndex + 1)%4
// variable for rotational value for down face
let rotateValueToEdgeDestination;
// first step is to check the difference between the edge piece index and the corner piece index
let distanceToEdgeDestination = edgeDestination - edgeCurrentIndex

// calculate forward rotations to edge destination
if(distanceToEdgeDestination < 0){
  rotateValueToEdgeDestination = distanceToEdgeDestination + 4
}else{rotateValueToEdgeDestination = distanceToEdgeDestination}

// four rotations are required to join the pieces
let moveOne; // place edge piece
let moveTwo = '' // rotate side face to bring corner up to last layer
let moveThree = 'U`' // join the pieces
let moveFour = '' // undo move two
let algoArray = []

// DETERMINES UP LAYER ROTATIONS TO POSITION EDGE PIECE
switch(rotateValueToEdgeDestination){
  case 1: moveOne = 'U`'
    break;
    case 2: moveOne = 'U2'
      break;
      case 3: moveOne = 'U'
        break
        default:
          console.log('edge piece already in position')
        // whichever rotation is used will need to be reversed once the pair is joined and moved to the last layer
        moveOne = 'N/A'
}


// DETERMINES SIDE-FACE TO ROTATE CLOCKWISE
switch(CornerVerticalIndex){
  case 0:
    moveTwo = 'L';
    moveFour = 'L`'
  break;
  case 1:
    moveTwo = 'F';
    moveFour = 'F`'
    break;
    case 2:
      moveTwo = 'R';
      moveFour = 'R`'
      break;
default: // must be vertical edge 3
moveTwo = 'B';
moveFour = 'B`'
}

console.log(`
move one: ${moveOne}
move two: ${moveTwo}
move three: ${moveThree}
move four: ${moveFour}
`)

algoArray = [moveOne, moveTwo, moveThree, moveFour]
console.log('algorithm array')
console.log(algoArray)
// position the F2L pair on the last layer at the vertical index where it sits naturally when solved
algorithmExecution(algoArray)


// the algorithm will take 6 seconds to execute, so after it is complete, the next step, solving and placing the pair, can run. Get indexes (remember, the edge index will be new, the destination index) of both corner and edge, and send them along with the corner and edge pieces to the solve F2L pair function 

setTimeout(() => {

     // variable for F2L edge and corner arrays holding facets for each piece
     let F2LEdge = upLayerEdges[edgeDestination]
     let F2LCorner = upLayerCorners[CornerVerticalIndex]
     
 console.log('checking parameters for solving pair function - at this point the, the pair is not placed for solving')
console.log(F2LCorner)
console.log(F2LEdge)
console.log(CornerVerticalIndex)
console.log(edgeDestination)

  solveF2LPair(F2LCorner, F2LEdge, CornerVerticalIndex, edgeDestination)
}, 7000);



        break;
        case 5: console.log(`
        EDGE: layer 2
        CORNER: layer 3
       rotate the corner piece until it has the same index as the F2L vertical edge piece on layer 2, this joins the pair;  clockwise rotate the face which shares the same index as the vertical edge that the pair sits on; this places the pair lying down on layer 3.   U prime the top face, then prime the side face turned to get the entire piece onto layer 3. Then U2 the top layer - this will leave the corner piece at the vertical edge which index where the edge piece was oritingally, and the edge piece (on the up layer edges) will have the same index as the corner piece. 
      `)

console.log(F2LPair)
//           // get indexes of corner and edge
          let midLayerEdgeIndex = F2LPair['edge_details']['edge_index']
          let upLayerCornerIndex = F2LPair['corner_details']['main_details']['vertical_index']

 //check the difference between the edge piece index and the corner piece index
          let cornerDistanceToEdge = midLayerEdgeIndex - upLayerCornerIndex

      let rotationsToEdge;
      // calculate forward rotations to edge destination
      if(cornerDistanceToEdge < 0){
        rotationsToEdge = cornerDistanceToEdge + 4
      }else{rotationsToEdge = cornerDistanceToEdge}


//       // five rotations are required to join the pieces and to get them to the solve position
      let moveOneLayers23; // place edge piece
      let moveTwoLayers23 = '' // rotate side face to bring corner up to last layer
      let moveThreeLayers23 = 'U`' // join the pieces
      let moveFourLayers23 = '' // undo move two
      let moveFiveLayers23 = 'U2' // place corner piece back to initial vertical index
      let algoArrayLayers23 = []
// note that by returning the corner piece to the vertical index position it occupied prior to joining the two pieces, this will cause the edge piece to be at the last layer edge index position, that has the same value as the mid layer index position occupied by the edge prior to being moved.  So the two indexes, corner and edge index, remain the same after the join.  The only difference is that the edge piece is on the last layer now, but with the same index position it had on the mid layer.  So we don't have to search for the two idexes.  

// the first move is how much the up layer must move to get the corner piece to sit above the edge piece.  That is already calculated above, so switch the distance and then assign the rotation to the moveOneLayers23 variable
if(rotationsToEdge === 0){
  moveOneLayers23 = 'N/A'
}else if(rotationsToEdge === 1){
  moveOneLayers23 = 'U`'
}else if(rotationsToEdge === 2){
   moveOneLayers23 = 'U2'
}else{
// three rotations are required so use U prime
moveOneLayers23 = 'U'
}




// DETERMINES SIDE-FACE TO ROTATE CLOCKWISE
if(midLayerEdgeIndex === 0){
  moveTwoLayers23 = 'L';
  moveFourLayers23 = 'L`'
}else if(midLayerEdgeIndex === 1){
  moveTwoLayers23 = 'F';
  moveFourLayers23 = 'F`'
}else if(midLayerEdgeIndex === 2){
  moveTwoLayers23 = 'R';
  moveFourLayers23 = 'R`'
}else{
  moveTwoLayers23 = 'B';
  moveFourLayers23 = 'B`'
}

algoArrayLayers23 = [moveOneLayers23, moveTwoLayers23, moveThreeLayers23, moveFourLayers23, moveFiveLayers23]

console.log('array with move details for joining the pair')
console.log(algoArrayLayers23)

console.log(
  `
  rotations to edge piece: ${rotationsToEdge}
  `
)

console.log('pair details')
console.log(F2LPair)
// position the F2L pair on the last layer at the vertical index where it sits naturally when solved
algorithmExecution(algoArrayLayers23)


// the algorithm will take 7.5 seconds to execute, so after it is complete, the next step, solving and placing the pair, can run. Get indexes of both corner and edge, and send them along with the corner and edge pieces to the solve F2L pair function 

setTimeout(() => {


  // AFTER MOVES HAVE BEEN MADE - CHECK RESULTS
  // where the corner should have landed on the last layer

  console.log('F2L pair')
  console.log(F2LPair)
  let F2LCorner;
  let F2LEdge;
  let newCornerIndex;
  let newEdgeIndex

  console.log('checking up layer corners')
  console.log(upLayerCorners)
  // get corner from new position
  upLayerCorners.forEach((upCorner, upIndexCorner) =>{
    console.log('logging each F2L corner to see that we have the correct orientation')
    console.log(upCorner)
    // IF THE CHECKED CORNER HAS THE SAME TWO COLOUR FACETS AS THE F2L EDGE
    if(upCorner.includes(F2LPair['edge_details']['matching_edge'][0]) && upCorner.includes(F2LPair['edge_details']['matching_edge'][1]) && upCorner.includes('w')){
      // grab the corner in its new position
     F2LCorner = upLayerCorners[upIndexCorner]
     // get the corner's new vertical edge index (same as the corner index)
     newCornerIndex = upIndexCorner
    }
  }
    )

    console.log('checking up layer edges')
    console.log(upLayerEdges)

    // get new edge position
    upLayerEdges.forEach((upEdge, upIndexEdge) =>{
      // if the examined edge has the same two facets as the F2L EDGE
      if(upEdge.includes(F2LPair['edge_details']['matching_edge'][0]) && upEdge.includes(F2LPair['edge_details']['matching_edge'][1]) ){
        // grab the new edge
        F2LEdge = upLayerEdges[upIndexEdge]
        // grab the new edge index (this is not a vertical edge index as before but an up index)
        newEdgeIndex = upIndexEdge
      }
    }
      )

     
 console.log('checking parameters for solving pair function')
console.log(F2LCorner)
console.log(F2LEdge)
  solveF2LPair(F2LCorner, F2LEdge, newCornerIndex, newEdgeIndex)
}, 9000);














          break;
      default: // value has to be 6
      console.log(`
      EDGE: layer 3
      CORNER: layer 3
      both pieces are already on last layer, find the natural index of the corner piece, rotate it to the vertical edge that is one index position clockwise of the natural vertical edge of the corner; forward rotate the face that has the same index as the natural verdical edge index of the corner piece, then rotate the up layer until the edge piece sits at the edge which has the same index of the corner that is clockwise to the natural corner index.  Undo the face rotate with a face prime, U rotate to get the corner back to its natural vertical index.  The edge piece will share the same index as the corner, but it will be the index of the piece as it sits in upLayer edges. `)


      let upLayerEdgeIndex = F2LPair['edge_details']['edge_index']
      let edges = F2LPair['edge_details']['matching_edge'] 
      let cornerIndex = F2LPair['corner_details']['main_details']['vertical_index']
      let cornerNaturalIndex;
      let layer3Rotation;

// get natural index of corner by examining the two edge facet colors
if(edges[0].includes('r') && edges[0].includes('g')){
  cornerNaturalIndex = 0;
}else if(edges[0].includes('o') && edges[0].includes('g')){
  cornerNaturalIndex = 1;
}else if(edges[0].includes('o') && edges[0].includes('b')){
  cornerNaturalIndex = 2;
}else{
  cornerNaturalIndex = 3;
}


let distanceToNaturalIndex = cornerNaturalIndex - cornerIndex;
let edgeToNaturalPlusOne = cornerNaturalIndex - upLayerEdgeIndex + 1;

// correction for negative numbers
if(distanceToNaturalIndex < 0){
layer3Rotation = distanceToNaturalIndex + 4
}else{layer3Rotation = distanceToNaturalIndex}



let joinMove;
let moveLayer3Two;
let moveLayer3Three;
let moveLayer3Four;
let moveLayer3Five;

let 
// rotation that moves the corner piece to natural vertical index; 
if(layer3Rotation === 0){
joinMove = 'N/A'
}else if(layer3Rotation === 1){
joinMove = 'U`'
}else if(layer3Rotation === 2){
joinMove = 'U2'
}else{ // layer rotation = 3
joinMove = 'U'
}


// check if the pair is already joined. 
if(upLayerEdgeIndex === cornerIndex || upLayerEdgeIndex === (cornerIndex + 1)%4){
// edgeIndex = cornerIndex, or edgeIndex = (cornerIndex + 1)%4, so the pieces are already joined
  // two other possibilities exist
}else{

  if(Math.abs(upLayerEdgeIndex - cornerIndex === 2)){
      // edgeIndex - cornerIndex has an absolute value of 2; 
// the edge is two ahead of/ or behind the corner; forward rotate the side-face that has the index (corner index + 1)%4, U prime rotate, then undo the side face rotation


  }else{
    //  edgeIndex - cornerIndex = -1,  (or 3). This will be the default if the other conditions fail
// the edge is three ahead of the corner; if sideFace index = cornerIndex, prime rotate the side-face,  followed with a 'U' move, then undo the side face rotation
  }



}

  // after the pairing, do lastMoveToJoin so the corner piece sits at its natural vertical index, ready for teh solve
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

  console.log('F2L corner and edge pieces, coming into solve F2L pair function')
// use edge facet colours determine the natural vertical edge of the F2L pair so that the pair can be moved to where the F2L corner sits at the natural vertical index of the F2L piece (from where a solve will result in an insertion of the F2L pair in the correct position). Once in the right place, the facets of the pieces can be examined for rotation and orientation, which will, in conjunction with the natural vertical edge index, dictate which algorithm will be executed to solve and insert the F2L pair. 



// variable for the natural vertical index of the F2L pair
let naturalVerticalIndex;
// variable for the number of forward rotations required to move the F2L corner to the natural vertical index. 
let rotationsToNaturalIndex


// since orange/red and green/blue are not straddled by an edge, there are only 4 possible combinations of two color facets on an edge,  r/g r/b o/g and o/b.  Check which two colours the edge piece array includes and assign the the natural index variable the index of the vertical edge that lies between those two colours
if(edge.includes('r') && edge.includes('g')){
  naturalVerticalIndex = 0
}else if(edge.includes('r') && edge.includes('b')){
  naturalVerticalIndex = 3
}else if(edge.includes('o') && edge.includes('b')){
  naturalVerticalIndex = 2
}else{// the two colors must be orrange and green which vertical index '1' lies between
  naturalVerticalIndex = 1
}


console.log('naturalVerticalIndex')
console.log(naturalVerticalIndex)

//  NOTE; as a convention ALWAYS subtract the index of the piece that is to be moved. 
// if/else the sum of current corner index minus natural vertical index
let rotationCalc = naturalVerticalIndex - cornerIndex
console.log('rotations calculation')
console.log(rotationCalc)
if( rotationCalc >= 0){
  rotationsToNaturalIndex = rotationCalc

}else{
  rotationsToNaturalIndex = rotationCalc + 4
}

// variable for algorithm execution array
let algoArray;
// variable for rotation name
let rotationParam;
// use the rotationsToNaturalIndex value to forward rotate the up layer so that the corner F2L piece sits in the correct place for solving. 


  switch(rotationsToNaturalIndex){
case 0:
  rotationParam = 'N/A';
break;
case 1:
  rotationParam = 'U`'
  console.log('single last layer U` rotation to move F2L piece')
  break;
case 2:
  rotationParam = 'U2'
  console.log('double last layer rotation to move F2L piece')
  break;
  default: // 3 rotations required, but a single prime rotation will get the same result. 
  rotationParam = 'U'
  console.log('prime last layer rotation to move F2L piece')
  }
// send move for execution
algoArray = [rotationParam]
algorithmExecution(algoArray)


// now examine the pair for solving
setTimeout(() => {

  // variable for white facet axis
  let whiteAxis;
  // variable for match state
  let solvedEdge; 
  // variable for F2L corner/edge direction
  let isParallelToFace;
  // NOTE:  DIRECTION OF F2L - the direction of the F2L corner/edge piece depends on the position of the edge piece in relationship to the corner piece; it is always parallel to the face which shares the index of the edge piece.  F2L corner/edge piece configuration has a reflection which is perpendicular to the original, and have their own specific solve algorith.  Trying to solve the original F2L with the algorithm for its reflection will not result in a solve and might even result in the pieces being separated.  The edgeIndex argument to this function is used to differentiate between the original F2L and its reflection, by comparing it to the corner index which has the same index as one of the faces. If the corner and edge indexes are the same, then the piece lies parallel to the face which shares the same index value as the corner piece, otherwise it sits perpendicular to the face. NOTE: because of the shape of a cube, the F2L piece can only be parallel or perpendicular to any given face, so the variable below uses a boolean value to indicate if the F2L piece is parallel to the face; if the value is false then the piece must be perpendicular to the face. 

  // THE CORNER INDEX AFTER TRANSLATION IS THE NATURAL VERTICAL INDEX - ALSO, a rotation of the corner, if a single or prime rotation, i.e. the corner piece moves to an adjacent corner, the order of the colours in the corner array wil change; for example, if a corner piece is white, blue and orange, with white on facing up, at corner index '1', the orange facet will be on the '2' index face, facing the solver, and so will have the y-axis value, which is the second element of the array. But if a U prime rotation occurs, then the piece will be at corner index '2', and the orange facet will now be facing away from the solver (to the left), on the '3' index face, and will have the x-axis value, which is the third element in the array.  So the array elements are arranged differently on adjacent corners; on corner index '1' the array is [w, o, b], but on corner index '2' the array is [w, b, o].  Getting these wrong will cause the matched boolean value to be incorrect leading to the wrong algorithm to be selected for the solve.  So after the two pieces are joined and have been translated to the natural vertical index of the corner, the corner piece needs to be found again and its array details updated. Since the 'z' properties on the F2L edge piece don't change when the piece is translated by a rotation, its relationship to the F2L cross piece remains intact relatively speaking, so a swapped edge before translation remains a swapped edge after translation, but the corner array needs to have its elements rearranged so that a comparison of the elements across both arrays still gives the exact orientations of the pieces, relative to each other.  

// for the correct algorithm to be detected, new edge details, natural vertical index and new corner details and index is needed. 

  let newCornerDetails;
  upLayerCorners.forEach((newCorner, newCornerIndex) =>{
    console.log('checking each corner for index and details')
    console.log(newCorner)
    if(newCorner.includes(edge[0]) && newCorner.includes(edge[1]) && newCorner.includes('w')){
      newCornerDetails = newCorner
      // note that the F2L piece has already moved to the natural vertical index for the corner piece so that value is used for the edges new index
    }
  })

  let newEdgeDetails;
  // a new edge index is also needed
  let newEdgeIndex;
  upLayerEdges.forEach((newEdge, edgeIndex) =>{
    console.log('checking each edge for index and details')
    console.log(newEdge)
    if(newEdge.includes(edge[0]) && newEdge.includes(edge[1])){
      newEdgeDetails = newEdge
      newEdgeIndex = edgeIndex
    }
  })

  // object for solved edge (used in algorithmExecute function)
  let pairObj = {
    'index_of_corner': naturalVerticalIndex, 
    'edge':newEdgeDetails,
    'index_of_edge': newEdgeIndex,
    'corner': newCornerDetails,
    'pair_orientation': '', 
    'axis_of_white': '',
    'solved_edge': '',
  }

  console.log('pairObj')
  console.log(pairObj)
  // IF CONDITION for determining direction of F2L corner/edge piece in relation to the face which ahs the same index as the natural index. . 
switch(naturalVerticalIndex){
  case 0:
    if(newEdgeIndex === 0){
      isParallelToFace = true // to BACK face
      pairObj['pair_orientation'] = 'parallel to BACK face'
    }else{
      isParallelToFace = false // to BACK face
      pairObj['pair_orientation'] = 'perpendicular to BACK face'
    }
break;
case 1:
  if(newEdgeIndex === 1){
    isParallelToFace = true  // to LEFT face
    pairObj['pair_orientation'] = 'parallel to LEFT face'
  }else{
    isParallelToFace = false // to LEFT face
    pairObj['pair_orientation'] = 'perpendicular to LEFT face'
  }
break;
case 2:
  if(newEdgeIndex === 2){
    isParallelToFace = true // to FRONT face
    pairObj['pair_orientation'] = 'parallel to FRONT face'
  }else{
    isParallelToFace = false // to FRONT face
    pairObj['pair_orientation'] = 'perpendicular to FRONT face'
  }
break;
default: // index is 3
if(newEdgeIndex === 3){
  isParallelToFace = true // to RIGHT face
  pairObj['pair_orientation'] = 'parallel to RIGHT face'
}else{
  isParallelToFace = false // to RIGHT face
  pairObj['pair_orientation'] = 'perpendicular to RIGHT face'
}

}

console.log('corner and edge colours of edge zero and corner 1')
let edgeZero = pairObj['edge'][0];
let cornerOne = pairObj['corner'][1];
let edgeOne = pairObj['edge'][1];
let cornerTwo = pairObj['corner'][2];
console.log(cornerOne)
console.log(edgeZero)

  // check which axis the white facet is is orthagonal to; Imagine the axis pointing through the facet from front to back. . 
  if(newCornerDetails[1] == 'w'){ // if white is on back or front face
    whiteAxis = 'y'
    pairObj['axis_of_white'] = 'y'
    if(newCornerDetails[0] == edge[0]){ // colours match on the UP face
solvedEdge = true
pairObj['solved_edge'] = true // matching edges
    }else{ 
      solvedEdge = false
      pairObj['solved_edge'] = false
    }
  }else if(newCornerDetails[2] == 'w'){ // white is on left or right face
    whiteAxis = 'x' 
    pairObj['axis_of_white'] = 'x'
    if(newCornerDetails[0] == edge[0]){
      solvedEdge = true // matching edges
      pairObj['solved_edge'] = true
    
    }else{
      solvedEdge = false
      pairObj['solved_edge'] = false
    }
  }else if(newCornerDetails[0] == 'w'){ // white is on up face because newCornerDetails[0] = 'w'
         whiteAxis = 'z' 
         pairObj['axis_of_white'] = 'z'
// if the face is PARALLEL
         if(isParallelToFace = true){
          if(edgeZero == cornerOne  && edgeOne !== cornerTwo  ){ // white must be on UP face
            console.log('edge 0 is corner 1 and edge 1 NOT corner 2')
            solvedEdge = false //  matching edges
            pairObj['solved_edge'] = false
                }else{
                  solvedEdge = true
                  pairObj['solved_edge'] = true
                }
         }else{
          // face is PERPENDICULAR
          if(edgeZero === cornerOne && edgeOne == cornerTwo){ // white must be on UP face
            console.log('edge 0 is corner 1 and edge 1 is corner 2')
            solvedEdge = true //  matching edges
            pairObj['solved_edge'] = true
                }else{
       
                  solvedEdge = false
                  pairObj['solved_edge'] = false
                }
         }
  }


  console.log(pairObj)

  // the information needed for the final solve of F2L corner/edge pairs is: axis of white, the solvedEdge boolean, the natural vertical index of the F2L corner/edge pair, and the orientation of the piece with respect to the face that shares the same index as the natural index. 
  if(solvedF2LIndexesArray.length < 4){
    generateF2LPairAlgorithm(pairObj)
  }
 

}, 2500);

}





// arra containing solved F2L pair
let solvedF2LPairsArray = []
// this holds just the indexes of the solved F2L edges. 
let solvedF2LIndexesArray = []


// FUNCTION FOR GENERATING ALGORITHMS TO SOLVE THE CURRENT JOINED PAIR
function generateF2LPairAlgorithm(object){

  console.log('check object which generates algorithm for F2L pair')
  console.log(object)

  let axisOfWhite = object['axis_of_white']; 
  let solvedEdge = object['solved_edge'];
  let naturalPosition = object['index_of_corner'];
  let parallelToFace = object['pair_orientation'];
  
//function for the actual moves. 
setTimeout(() => {
  console.log('white axis')
  console.log(axisOfWhite)
  
  console.log('solved edge')
  console.log(solvedEdge)
  
  console.log('natural vertical index')
  console.log(naturalPosition)
  
  console.log('parallel to face:')
  console.log(parallelToFace)

  console.log(object)
  
  // testing the use of arrays to execute functions
  let testAlgorithmArray = ['L', 'U2', 'L`', 'U`', 'L', 'U', 'L`']
  

  // algorithm array to send solve algorithm for current piece
  let algorithmArray = []



// there are six different types of F2L configuration, each having a reflection that sits perpendicular with respect to it; this yields six new cases, for a total of 12, because the reflections require unique solves.  Since the cube currently has no x, y or z rotation, the solves are executed from one viewpoint, or rather, from the point of view of one face only; the front face; I call that the solving face.  Because the solve of each F2L configuration is executed at the vertical edge where it needs to be inserted, each of the F2L configurations needs to be solved from a different corner, and hence a different angle, depending on the two non-white colours of the piece; requiring rotations of the algorithm to be adusted for 90, 180 and 270 degree differences. So there are four variations of each configuration, each variation being solved at a different corner.   In total, there are 48 algorithms for solving all six configurations, and their reflections across all the four corners of the cube. In a later iteration I will introduce the x, y and z rotations, and add double-layer rotations, where the rotating face takes the inner layer along with it, which will simplify a number of cases (especially orient and permute last layer cases).  The added cube rotations around x, y and z can be used to reduce the 48 algorithms down to 12, where the cube will be rotated around the z-axis so that the F2L will always be solved from the same corner - and therefore there will be no need to re-write the 12 base case algorithms to compensate for different angles.  Then set up moves could be used to that either the F2L configuration or its relfection needs solving is exclusively solved, depending on which is easier to solve; that will further reduce the number of algorithms to 6.  For now, we code for the 48 different configurations. 


// Using the orientation of the white piece, the orientation, parallel or perpendicular, of the piece with respect to the face which shares the index of the corner, and whether or not one of the edges of the F2L piece is already solved, will yield the 12 configurations that are the basis for all possible configurations of F2L corner/edge pieces.  I'll use if/else statements for the configurations, and then once the white orientation, the piece orientation and the solved edge status is determined,  a switch statement will be used on the corner index where the configuration is found;  which will give the exact algorithm needed to solve the F2L configuration at the specific corner of the cube.  The algorithmArray contains the moves needed to solve the F2L configuration, and the array is passed to algorithmExecution, the funtion which executes the moves of the algorithm.  

// REFLECTIONS.  I use the term reflection to mean a piece that, sitting on the same angle, changes its orientation from parallel to perpendicular or vice versa. The corner stays the same but the piece changes angle by 90 degrees, this causes the piece to be configured differently with respect to the corner.  There are other reflections, such as when the white piece keeping the same orientation appears on the opposite face of the cube; but that requires the edge piece to be flipped, and all the rotations of the algorithm would be changed also; of course, this is impractical because moving the piece to the opposite side means that the piece would no longer be at the correct corner for solving anyway.  It would be at the adjacent corner which isn't where the piece would naturally sit, and hence the wrong place to execute a solve on the F2L piece.  


if(axisOfWhite == 'x'){ // ====================================== axis of white is 'x'

if(parallelToFace === true){ // PARALLEL 
if(solvedEdge === true){
// SWITCH CORNER INDEXES
switch(naturalPosition){
  case 0: algorithmArray = ['B', 'L`', 'B`', 'L']
    break;
    case 1: algorithmArray = ['L`', 'U', 'L', 'U2', 'F', 'U', 'F`']
      break;
      case 2: algorithmArray = ['F', 'R`', 'F`', 'R']
        break;
default: // vertical edge must be 3
algorithmArray = ['R`', 'U', 'R', 'U2', 'B', 'U', 'B`']
}


}else{ // solved edge is false
// SWITCH CORNER INDEXES
switch(naturalPosition){
  case 0: algorithmArray = ['L', 'U2', 'L`', 'U2', 'L', 'U2','L`', 'U`','L', 'U2', 'L`']
    break;
    case 1: algorithmArray = ['L`', 'U', 'L', 'U`', 'L`', 'U2', 'L', 'U2', 'L`', 'U', 'L']
      break;
      case 2: algorithmArray = ['R', 'U2', 'R`', 'U2', 'R', 'U2', 'R`', 'U`','R', 'U2', 'R`']
        break;
default: // vertical edge must be 3
algorithmArray = ['R`', 'U', 'R', 'U`', 'R`', 'U2', 'R', 'U2', 'R`', 'U', 'R']
}


}
}else{ // the piece is PERPENDICULAR in orientation
if(solvedEdge === true){
  // SWITCH CORNER INDEXES
  switch(naturalPosition){
    case 0: algorithmArray = ['L', 'U`', 'L`', 'U2', 'B`', 'U`', 'B']
      break;
      case 1: algorithmArray = ['F`', 'L', 'F', 'L`']
        break;
        case 2: algorithmArray = ['R', 'U`', 'R`', 'U2', 'F`', 'U`', 'F']
          break;
  default: // vertical edge must be 3
  algorithmArray = ['B`', 'R', 'B', 'R`']
  }
  
  
  }else{ // solved edge is FALSE
  // SWITCH CORNER INDEXES
  switch(naturalPosition){
    case 0: algorithmArray = ['L', 'U`', 'L`', 'U', 'L', 'U2', 'L`', 'U2', 'L', 'U`', 'L`']
      break;
      case 1: algorithmArray = ['L`', 'U2', 'L', 'U2', 'L`', 'U2', 'L', 'U2', 'L`', 'U', 'L']
        break;
        case 2: algorithmArray = ['R', 'U`', 'R`', 'U', 'R', 'U2', 'R`', 'U2', 'R', 'U`', 'R`']
          break;
  default: // vertical edge must be 3
  algorithmArray = ['R`', 'U2', 'R', 'U2', 'R`', 'U2', 'R', 'U2', 'R`', 'U', 'R']
  }
  
  
  }
}
}else if(axisOfWhite == 'y'){ // =============================== axis of white is 'y'

if(parallelToFace === true){
  if(solvedEdge === true){
    // SWITCH CORNER INDEXES
    switch(naturalPosition){
      case 0: algorithmArray = ['B`', 'U', 'B', 'U2', 'L', 'U', 'L`']
        break;
        case 1: algorithmArray = ['L', 'F`', 'L`', 'F']
          break;
          case 2: algorithmArray = ['F`', 'U', 'F', 'U2', 'R', 'U', 'R`']
            break;
    default: // vertical edge must be 3
    algorithmArray = ['R', 'B`', 'R`', 'B']
    }
    
    
    }else{ // solved edge is FALSE
    // SWITCH CORNER INDEXES
    switch(naturalPosition){
      case 0: algorithmArray = ['L', 'U`', 'L`', 'U2', 'B`', 'U', 'B', 'L', 'U2', 'L`']
        break;
        case 1: algorithmArray = ['L`', 'U', 'L', 'U2', 'L`', 'U', 'L', 'U`', 'F', 'U`', 'F`']
          break;
          case 2: algorithmArray = ['R', 'U`', 'R`', 'U2', 'F`', 'U', 'F', 'R', 'U2', 'R`']
            break;
    default: // vertical edge must be 3
    algorithmArray = ['R`', 'U', 'R', 'U2', 'R`', 'U', 'R', 'U`', 'B', 'U`', 'B`']
    }
    
    
    }
    }else{ // the piece is PERPENDICULAR in orientation
    if(solvedEdge === true){
      // SWITCH CORNER INDEXES
      switch(naturalPosition){
        case 0: algorithmArray = ['L`', 'B', 'L', 'B`']
          break;
          case 1: algorithmArray = ['L`', 'U`', 'L', 'U2', 'L`', 'U', 'L2', 'F`', 'L', 'F']
            break;
            case 2: algorithmArray = ['R`', 'F', 'R', 'F`']
              break;
      default: // vertical edge must be 3
      algorithmArray = ['R`', 'U`', 'R', 'U2', 'R`', 'U', 'R2', 'B`', 'R`', 'B']
      }
      
      
      }else{ // solved edge is FALSE
      // SWITCH CORNER INDEXES
      switch(naturalPosition){
        case 0: algorithmArray = ['U`', 'L', 'U2', 'L`', 'U', 'B`', 'U`', 'B']
          break;
          case 1: algorithmArray = ['U`', 'F', 'U`', 'F`', 'U', 'F', 'U', 'F`']
            break;
            case 2: algorithmArray = ['U`', 'R', 'U2', 'R`', 'U', 'F`', 'U`', 'F']
              break;
      default: // vertical edge must be 3
      algorithmArray = ['U`', 'B', 'U`', 'B`', 'U', 'B', 'U', 'B`']
      }
      
      
      }
    }
}else{ //  // ===============================axis of white is 'z'
  if(parallelToFace === true){
    if(solvedEdge === true){
      // SWITCH CORNER INDEXES
      switch(naturalPosition){
        case 0: algorithmArray = ['L`', 'U`', 'L', 'U`', 'L`', 'U2', 'L2', 'U2', 'L`']
          break;
          case 1: algorithmArray = ['F`', 'U`', 'F', 'U`', 'F`', 'U2', 'F2', 'U2', 'F`']
            break;
            case 2: algorithmArray = ['R`', 'U`', 'R', 'U`', 'R`', 'U2', 'R2', 'U2', 'R`']
              break;
      default: // vertical edge must be 3
      algorithmArray = ['B`', 'U`', 'B', 'U`', 'B`', 'U2', 'B2', 'U2', 'B`']
      }
      
      
      }else{ // solved edge is false
      // SWITCH CORNER INDEXES
      switch(naturalPosition){
        case 0: algorithmArray = ['B`', 'U2', 'B', 'U', 'B`', 'U`', 'B']
          break;
          case 1: algorithmArray = ['L`', 'U2', 'L', 'U', 'L`', 'U`', 'L']
            break;
            case 2: algorithmArray = ['F`', 'U2', 'F', 'U', 'F`', 'U`', 'F']
              break;
      default: // vertical edge must be 3
      algorithmArray = ['R`', 'U2', 'R', 'U', 'R`', 'U`', 'R']
      }
      
      
      }
    }else{ // the piece is PERPENDICULAR in orientation
      if(solvedEdge === true){
        // SWITCH CORNER INDEXES
        switch(naturalPosition){
          case 0: algorithmArray = ['B', 'U', 'L', 'U`', 'L`', 'B`', 'L', 'U`', 'L`']
            break;
            case 1: algorithmArray = ['L', 'U', 'R', 'U`', 'R`', 'L`', 'R', 'U`', 'R`']
              break;
              case 2: algorithmArray = ['F', 'U', 'R', 'U`', 'R`', 'F`', 'R', 'U`', 'R`']
                break;
        default: // vertical edge must be 3
        algorithmArray = ['R', 'U', 'B', 'U`', 'B`', 'R`', 'B', 'U`', 'B`']
        }
        // 'L', 'U', 'R', 'U`', 'R`', 'L`', 'R', 'U`', 'R`'
        
        }else{ // solved edge is false
        // SWITCH CORNER INDEXES
        switch(naturalPosition){
          case 0: algorithmArray = ['L', 'U2', 'L`', 'U`', 'L', 'U', 'L`']
            break;
            case 1: algorithmArray = ['F', 'U2', 'F`', 'U`', 'F', 'U', 'F`']
              break;
              case 2: algorithmArray = ['R', 'U2', 'R`', 'U`', 'R', 'U', 'R`']
                break;
        default: // vertical edge must be 3
        algorithmArray = ['B', 'U2', 'B`', 'U`', 'B', 'U', 'B`']
        }
        
        
        }
    }
}

/**
           case 2: algorithmArray = ['R', 'U2', 'R`', 'U`', 'R', 'U', 'R`']
================ X facing white piece =============

 White orientation: x
 F2L orientation: parallel
 Solved edge: true

  White orientation: x
 F2L orientation: parallel
 Solved edge: false

  White orientation: x
 F2L orientation: perpendicular
 Solved edge: true

  White orientation: x
 F2L orientation: perpendicular
 Solved edge: false

 ================ Y facing white piece =============

 White orientation: y
 F2L orientation: parallel
 Solved edge: true

  White orientation: y
 F2L orientation: parallel
 Solved edge: false

  White orientation: y
 F2L orientation: perpendicular
 Solved edge: true

  White orientation: y
 F2L orientation: perpendicular
 Solved edge: false

  ================ Z facing white piece =============

 White orientation: z
 F2L orientation: parallel
 Solved edge: true

  White orientation: z
 F2L orientation: parallel
 Solved edge: false

  White orientation: z
 F2L orientation: perpendicular
 Solved edge: true

  White orientation: z
 F2L orientation: perpendicular
 Solved edge: false

 */

// push the object to solve array for debugging purposes
solvedF2LPairsArray.push(object)
// push the index of the solved vertical edge
solvedF2LIndexesArray.push(naturalPosition)

let algorithmDuration = algorithmArray.length*1500 + 1500

setTimeout(() => {
  algorithmExecution(algorithmArray)   
}, 500);






setTimeout(() => {
// here we decide what to do once the algorithm is complete. If solved edges are less than 4 execute the function again
console.log('solved pieces')
console.log(solvedF2LIndexesArray.length)
if(solvedF2LIndexesArray.length < 4){
  findF2LcornersFirstLayer(solvedF2LIndexesArray)
}else{
  console.log('F2L stage complete.  Orient Last Layer...')
}
}, algorithmDuration);
// I think the agorithm execution function should be reserved for exclusively executing the rotations on the cube, and the decisions about what to do next should come from here within the solve algorithms


}, 1000);
  }
  

let executionArrayAll = []
function algorithmExecution(array, stage){
  console.log(array)
  console.log('stage')
  console.log(stage)
  // create a variable for the total length of time the algorithm takes to complete, and add an extra 1.5 seconds at the end. This will be used in the settimeout that has the code for dictating which step is required after the algorithm is complete. The extra 1.5 seconds is to ensure there's a gap between the last step in the algorithm and the instructions for the next step in the stage, or for the next stage to be executed. 

  let totalAlgorithmTime = (array.length + 1)*1500

  // variable for logging the name of the rotation currently being executed.  This will be helpful once a 3D version of the cube has been built to ensure the movements match rotation function being used. 
  let rotationName;
  array.forEach((move, index) =>{

    console.log('move index')
    console.log(index)
    setTimeout(() => {

    switch(move){
case 'L':
  rotationName = 'left rotate'
  leftRotate('l-btn')
break;
case 'R':
  rotationName = 'right rotate'
  rightRotate('r-btn')
break;
case 'U':
  rotationName = 'up rotate'
  upRotate('u-btn')
break;
case 'D':
  rotationName = 'down rotate'
  downRotate('d-btn')
break;
case 'F':
  rotationName = 'front rotate'
  frontRotate('f-btn')
break;     
case 'B':
  rotationName = 'back rotate'
  backRotate('b-btn')
break;
case 'L`':
  rotationName = 'left prime rotate'
  leftRotate('l-prime-btn')
break;
case 'R`':
  rotationName = 'right prime rotate'
  rightRotate('r-prime-btn')
break;
case 'U`':
  rotationName = 'up prime rotate'
  upRotate('u-prime-btn')
break;
case 'D`':
  rotationName = 'down prime rotate'
  downRotate('d-prime-btn')
break;
case 'F`':
  rotationName = 'front prime rotate'
  frontRotate('f-prime-btn')
break;     
case 'B`':
  rotationName = 'back prime rotate'
  backRotate('b-prime-btn')
break;
case 'L2':
  rotationName = 'left double rotate'
  leftRotate('l2-btnless', 'double')
break;
case 'R2':
  rotationName = 'right double rotate'
  rightRotate('r2-btnless', 'double')
break;
case 'U2':
  rotationName = 'up double rotate'
  upRotate('u2-btnless', 'double')
break;
case 'D2':
  rotationName = 'down double rotate'
  downRotate('d2-btnless', 'double')
break;
case 'F2':
  rotationName = 'front double rotate'
  frontRotate('f2-btnless', 'double')
break;     
case 'B2':
  rotationName = 'back double rotate'
  backRotate('b2-btnless', 'double')
break;
case 'N/A':
  console.log('null move')
    }
      console.log(rotationName)
    }, index*1500);
  })

// in order to execute code 'after' all the rotations are complete, just set a timeout with the length of the array argument + 1, and multiply that number by 1500.  From there, the step can either be repeated if the stage is F2L, or the OLL or PLL stages can begin as necessary



setTimeout(() => {
  console.log('algorithm complete')
  executionArrayAll = [...executionArrayAll, ...array]
  console.log(executionArrayAll)
}, totalAlgorithmTime);


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