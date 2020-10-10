import React from 'react';
import { Map, Marker, Polygon } from 'react-leaflet';
import Popup from '../popups/Popup/Popup'
import './Map.css';
import diveIcon from '../../Images/Markers/diveMarker'
import Modal from '../Modal/Modal'
import LayerControls from '../Map/Controls/LayerControl/LayerControls'

let modal = null;
let polygon = [
  [
    [
      -34.03898689799873,
      151.20091795921329
    ],
    [
      -34.03886243057429,
      151.2002527713776
    ],
    [
      -34.038657947980504,
      151.200145483017
    ],
    [
      -34.038231200109884,
      151.20041370391849
    ],
    [
      -34.038000044116856,
      151.20076775550845
    ],
    [
      -34.037857793961884,
      151.2011539936066
    ],
    [
      -34.037937809703415,
      151.20140075683594
    ],
    [
      -34.03812451280677,
      151.20147585868838
    ],
    [
      -34.03809784096002,
      151.20161533355716
    ],
    [
      -34.03818674708322,
      151.2017869949341
    ],
    [
      -34.03841790256747,
      151.2018728256226
    ],
    [
      -34.0385779329183,
      151.20188355445865
    ],
    [
      -34.038782415705,
      151.20192646980288
    ],
    [
      -34.03904024112472,
      151.20188355445865
    ],
    [
      -34.03923583229965,
      151.20201230049136
    ],
    [
      -34.03947587539792,
      151.20217323303225
    ],
    [
      -34.0395825610013,
      151.2021517753601
    ],
    [
      -34.03964479420799,
      151.2022376060486
    ],
    [
      -34.039635903752675,
      151.20233416557315
    ],
    [
      -34.03955588961304,
      151.20257019996646
    ],
    [
      -34.03965368466235,
      151.2027418613434
    ],
    [
      -34.041085035662974,
      151.20564937591553
    ],
    [
      -34.043538724036,
      151.2048125267029
    ],
    [
      -34.04574342694843,
      151.20253801345828
    ],
    [
      -34.04560118978055,
      151.1982893943787
    ],
    [
      -34.04467664237396,
      151.19444847106934
    ],
    [
      -34.03808005972419,
      151.19408369064334
    ],
    [
      -34.037439932752044,
      151.1954998970032
    ],
    [
      -34.0385779329183,
      151.196722984314
    ],
    [
      -34.03948476586999,
      151.19736671447757
    ],
    [
      -34.04033824685029,
      151.19781732559207
    ],
    [
      -34.04122728040557,
      151.19779586791995
    ],
    [
      -34.041671793688586,
      151.19880437850955
    ],
    [
      -34.04149398865496,
      151.19925498962405
    ],
    [
      -34.04128062212256,
      151.1995339393616
    ],
    [
      -34.04078276479281,
      151.2000060081482
    ],
    [
      -34.04060495789537,
      151.2003064155579
    ],
    [
      -34.04065830000374,
      151.20058536529544
    ],
    [
      -34.04065830000374,
      151.20079994201663
    ],
    [
      -34.04049827357799,
      151.200864315033
    ],
    [
      -34.04032046608414,
      151.200864315033
    ],
    [
      -34.04023156219742,
      151.20092868804934
    ],
    [
      -34.04010709659948,
      151.2009930610657
    ],
    [
      -34.039715917816835,
      151.2012076377869
    ],
    [
      -34.03934251820497,
      151.20101451873782
    ],
    [
      -34.03904024112472,
      151.2009930610657
    ],
    [
      -34.03886243057429,
      151.20034933090213
    ],
    [
      -34.03868461965112,
      151.20015621185306
    ],
    [
      -34.03820452829668,
      151.20047807693484
    ]
  ],
  [
    [
      [
        -34.00460917026712,
        151.21688246726993
      ],
      [
        -34.004137780305086,
        151.21747255325317
      ],
      [
        -34.00299931828655,
        151.21853470802307
      ],
      [
        -34.00307936689599,
        151.21895313262942
      ],
      [
        -34.00274138336513,
        151.2196505069733
      ],
      [
        -34.00277696064224,
        151.21989727020267
      ],
      [
        -34.002705806073116,
        151.2200474739075
      ],
      [
        -34.002545708074635,
        151.21974706649783
      ],
      [
        -34.00184305217937,
        151.22146368026736
      ],
      [
        -34.00153174707651,
        151.2210023403168
      ],
      [
        -34.00122044083272,
        151.2219572067261
      ],
      [
        -34.001513958179025,
        151.22253656387332
      ],
      [
        -34.00176300240475,
        151.22348070144656
      ],
      [
        -34.00216325052343,
        151.22417807579043
      ],
      [
        -34.00264354577622,
        151.22510075569156
      ],
      [
        -34.00288369238416,
        151.22545480728152
      ],
      [
        -34.002892586689924,
        151.2257552146912
      ],
      [
        -34.00091802796051,
        151.2285125255585
      ],
      [
        -33.998294106372605,
        151.2216675281525
      ],
      [
        -34.00018867483913,
        151.21613144874576
      ],
      [
        -34.00291037529868,
        151.21437191963196
      ],
      [
        -34.0053384854303,
        151.21652841567996
      ]
    ]
  ],
  [
    [
      -34.040356027612724,
      151.20625019073486
    ],
    [
      -34.043698744724885,
      151.20491981506348
    ],
    [
      -34.04633015274402,
      151.20522022247317
    ],
    [
      -34.04672130101905,
      151.20968341827395
    ],
    [
      -34.04640127074641,
      151.21474742889407
    ],
    [
      -34.04455218329943,
      151.2175798416138
    ],
    [
      -34.042205206552914,
      151.21762275695804
    ],
    [
      -34.04099613257769,
      151.21620655059817
    ],
    [
      -34.04049827357799,
      151.21539115905762
    ],
    [
      -34.041209499825804,
      151.21466159820557
    ],
    [
      -34.041849598349465,
      151.21496200561526
    ],
    [
      -34.04199184180977,
      151.21440410614017
    ],
    [
      -34.04135174435967,
      151.21397495269775
    ],
    [
      -34.04160067171986,
      151.21328830718994
    ],
    [
      -34.041849598349465,
      151.21273040771487
    ],
    [
      -34.04152954969151,
      151.2120866775513
    ],
    [
      -34.04124506098163,
      151.21157169342044
    ],
    [
      -34.04117393865506,
      151.21032714843753
    ],
    [
      -34.04067608069907,
      151.20968341827395
    ],
    [
      -34.04117393865506,
      151.20865345001224
    ],
    [
      -34.04124506098163,
      151.20800971984866
    ],
    [
      -34.04124506098163,
      151.2074947357178
    ],
    [
      -34.04152954969151,
      151.20732307434085
    ],
    [
      -34.04046271210904,
      151.20616436004642
    ]
  ]
];
const MapWrapper = ( props ) => {

  const initialState = {overlay: false};
  const [state, setState] = React.useState(initialState);

  const overlayHandler = ( content ) => {
    
    // console.log( content )
    // debugger
    if( state.overlay || !content ){
      setState({overlay: false});
      modal = null;
    } else {
      modal = (<Modal clicked={overlayHandler}>{ content }</Modal>);
      setState({overlay: true});
    }
      console.log(state.overlay)
  }

  // let modal = null;
  // console.log(modal)

      return (
        <div>
          <div className="leaflet-container">
              <Map center={[-34.040441,151.1988752]} zoom={13} onClick={ (e)=>{ polygon.push( Object.values(e.latlng) );  console.log(polygon)} }>
                <LayerControls/>
                <Marker 
                position={[-34.04236522975801, 151.19794607162476]}
                icon={diveIcon}
                >
                  <Popup clicked={overlayHandler}>A popup!</Popup>
                </Marker>
                 <Polygon color="purple" positions={polygon} onClick={()=>{console.log("You clicked the polygon!")}} />
              </Map>
            </div>
            { modal }
          </div>
      );
}

  export default MapWrapper;