
## Structure JSON for Coco

General Structure for JSON Coco

```json
{
	"info" : info,                 // Object, General information of one data set
	"images" : [image],            // [Object]
	"annotations" : [annotation],  // [Object]
	"licenses" : [license],        // [Object]
}
```

General information for json dataset, one dataset inlucde many link to 

```
info {
	"year"         : int,
	"version"      : str,
	"description"  : str,
	"contributor"  : str,
	"url"          : str,
	"date_created" : datetime,
}
```

```json
image {
	"id"            : int,
	"width"         : int,
	"height"        : int,
	"file_name"     : str,
	"license"       : int,
	"flickr_url"    : str,
	"coco_url"      : str,
	"date_captured" : datetime,
}
```

```json
license {
	"id"   : int,
	"name" : str,
	"url"  : str,
}
```

With "*annotation*" has 3 types: Caption, Instances, Keypoints

Example structure data

```
{
  "info": {
    "description": "This is stable 1.0 version of the 2014 MS COCO dataset.",
    "url": "http://mscoco.org",
    "version": "1.0",
    "year": 2014,
    "contributor": "Microsoft COCO group",
    "date_created": "2015-01-27 09:11:52.357475"
  },
  "licenses": [
    {
      "id": 1,
      "name": "Attribution-NonCommercial-ShareAlike License",
      "url": "http://creativecommons.org/licenses/by-nc-sa/2.0/"
    },
    {
      "id": 2,
      "name": "Attribution-NonCommercial License",
      "url": "http://creativecommons.org/licenses/by-nc/2.0/"
    }
  ],
  "images": [
    {
      "id": 57870,
      "license": 5,
      "height": 480,
      "width": 640,
      "file_name": "COCO_train2014_000000057870.jpg",
      "coco_url": "http://mscoco.org/images/57870",
      "flickr_url": "http://farm4.staticflickr.com/3153/2970773875_164f0c0b83_z.jpg",
      "date_captured": "2013-11-14 16:28:13",
      
    }
  ],
  "annotations": [
    {
      "image_id": 318556,
      "id": 48,
      "caption": "A very clean and well decorated empty bathroom"
    }
  ]
}
```


### Captions

```
annotation {
  "id": int,
  "image_id": int,
  "caption": str,
}
```

### Instances

```
annotation {
  "id": int,
  "image_id": int,
  "category_id": int,
  "segmentation": RLE or [polygon],
  "area": float,
  "bbox": [
    x,
    y,
    width,
    height
  ],
  "iscrowd": 0, // input 0 or 1 
}
```

```
categories [
  {
    "id": int,
    "name": str,
    "supercategory": str,
    
  }
]
```

Example with polygon

```
{
	"segmentation": [
		[
			312.29, 562.89, 
			402.25, 511.49, 
			400.96, 425.38, 
			398.39, 372.69, 
			388.11, 332.85, 
			318.71, 325.14, 
			295.58, 305.86, 
			269.88, 314.86, 
			258.31, 337.99, 
			217.19, 321.29, 
			182.49, 343.13, 
			141.37, 348.27, 
			132.37, 358.55, 
			159.36, 377.83, 
			116.95, 421.53, 
			167.07, 499.92, 
			232.61, 560.32, 
			300.72, 571.89
		]
	],
	"area": 54652.9556,
	"iscrowd": 0,
	"image_id": 480023,
	"bbox": [116.95, 305.86, 285.3, 266.03],
	"category_id": 58,
	"id": 86
}
```

Example structure of categories

```
"categories": 
[
	{ "supercategory": "person",  "id": 1, "name": "person"}, 
	{ "supercategory": "vehicle", "id": 2, "name": "bicycle"}, 
	{ "supercategory": "vehicle", "id": 3, "name": "car"},
	{ "supercategory": "vehicle", "id": 4, "name": "motorcycle"}
]
```

Step convert data from source client:

Client side uses tool [OpenSurfaces][https://github.com/seanbell/opensurfaces-segmentation-ui] for draw shape over image for select one or more objects

Raw data when select from source client

```
{
	"1": [
		[0.10623229461756374, 0.660056657223796, 
		0.12960339943342775, 0.5297450424929179, 
		0.15509915014164305, 0.48441926345609065, 
		0.19546742209631726, 0.43059490084985835, 
		0.26558073654390935, 0.42209631728045327, 
		0.2804532577903683, 0.3937677053824363, 
		0.31444759206798867, 0.39660056657223797, 
		0.3909348441926345, 0.42209631728045327, 
		0.4036827195467422, 0.45609065155807366, 
		0.4376770538243626, 0.48441926345609065, 
		0.4695467422096317, 0.5014164305949008, 
		0.4695467422096317, 0.5835694050991501, 
		0.3973087818696884, 0.5835694050991501, 
		0.3951841359773371, 0.6742209631728046, 
		0.3718130311614731, 0.7110481586402266, 
		0.3080736543909348, 0.7280453257790368, 
		0.3080736543909348, 0.6628895184135978, 
		0.3038243626062323, 0.6288951841359773, 
		0.2528328611898017, 0.6005665722379604, 
		0.23796033994334276, 0.6430594900849859, 
		0.22308781869688385, 0.6543909348441926, 
		0.23371104815864022, 0.7138810198300283, 
		0.23796033994334276, 0.7393767705382436, 
		0.2018413597733711, 0.7790368271954674, 
		0.17422096317280453, 0.7875354107648725, 
		0.16572237960339942, 0.7903682719546742, 
		0.14022662889518414, 0.8016997167138811, 
		0.13597733711048157, 0.8243626062322946, 
		0.12322946175637393, 0.7818696883852692, 
		0.11685552407932011, 0.71671388101983, 
		0.11473087818696884, 0.6713881019830028, 
		0.11048158640226628, 0.6402266288951841]
	]
}
```

For create segmentation of polygon must get raw data multiplication with image size (example 600x400 first row will be : 63.6, 264)

And bbox value is min x, min y and width/height of box of this shape.


### Keypoints ( no see any example for use this data)


```
annotation{
  "keypoints": [
    x1,
    y1,
    v1,
    ...
  ],
  "num_keypoints": int,
  "[cloned]": ..., 
}

"[cloned]": denotes fields copied from object instance annotations defined in 4.1.

```

```
categories[
  {
    "keypoints": [
      str
    ],
    "skeleton": [
      edge
    ],
    "[cloned]": ...,
    
  }
]
```


Example:

```
	{
		"segmentation": [
			[329.88, 211.23, 337.63, 211.93, 341.51, 210.17, 341.86, 206.65, 340.1, 202.77, 335.52, 199.6, 335.52, 197.13, 335.52, 190.44, 339.04, 186.21, 342.57, 170.35, 345.74, 159.43, 342.57, 154.14, 340.1, 148.86, 336.93, 143.92, 337.28, 138.28, 344.68, 138.28, 340.45, 122.43, 339.75, 116.79, 334.46, 107.63, 320.37, 104.1, 325.65, 97.06, 326, 91.06, 321.77, 82.25, 316.49, 89.66, 305.21, 87.19, 304.51, 92.47, 304.16, 97.06, 305.21, 100.58, 304.16, 103.4, 292.53, 105.51, 284.42, 123.84, 278.43, 140.05, 273.14, 146.74, 273.85, 152.73, 279.49, 156.26, 281.6, 154.14, 284.07, 144.63, 289, 133, 293.23, 133.7, 294.99, 125.95, 295.35, 157.67, 312.26, 157.31, 318.96, 150.27, 335.17, 150.27, 333.76, 157.31, 324.95, 158.02, 315.43, 164.01, 309.44, 170, 306.27, 176.34, 305.56, 185.51, 310.85, 184.8, 313.67, 178.81, 312.97, 170.7, 316.14, 165.42, 320.01, 162.25, 323.18, 167.89, 327.06, 172.11, 333.4, 171.06, 330.23, 178.46, 330.58, 190.09, 329.18, 197.13, 329.18, 208.76],
			[307.1, 171.37, 309.57, 164.78, 295.02, 166.7, 296.11, 173.02, 299.68, 170.54, 306, 172.19]
		],
		"area": 3817.67415,
		"iscrowd": 0,
		"image_id": 196842,
		"bbox": [273.14, 82.25, 72.6, 129.68],
		"category_id": 1,
		"id": 183022,
		"keypoints": [311, 101, 2, 315, 98, 2, 308, 97, 2, 324, 97, 2, 304, 96, 1, 329, 110, 2, 299, 109, 2, 336, 134, 2, 288, 126, 2, 0, 0, 0, 279, 141, 2, 323, 151, 1, 302, 152, 2, 339, 160, 2, 300, 191, 1, 332, 197, 2, 299, 221, 1],
		"num_keypoints": 16
	}
```

Categoies

```
"categories": [{
	"supercategory": "person",
	"id": 1,
	"name": "person",
	"skeleton": [
		[16, 14],
		[14, 12],
		[17, 15],
		[15, 13],
		[12, 13],
		[6, 12],
		[7, 13],
		[6, 7],
		[6, 8],
		[7, 9],
		[8, 10],
		[9, 11],
		[2, 3],
		[1, 2],
		[1, 3],
		[2, 4],
		[3, 5],
		[4, 6],
		[5, 7]
	],
	"keypoints": ["nose", "left_eye", "right_eye", "left_ear", "right_ear", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle"]
}]
```


---




