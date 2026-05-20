# Barisal SAR Surface Water Analysis
### Monsoon surface water signal, Barisal Division 2015–2025

Barisal Division sits within the lower Ganges-Brahmaputra-Meghna delta, a low-lying riverine environment strongly influenced by seasonal monsoon inundation. This project uses 11 years of Sentinel-1 SAR imagery to map the spatial distribution of persistent monsoon surface water occurrence across the division's 43 upazilas. A secondary analysis tests whether that spatial pattern clusters non-randomly across administrative units.

SAR is used rather than optical imagery because monsoon cloud cover makes optical sensors unreliable during the exact months when inundation occurs.

---

## What this analysis finds

The derived surface water frequency surface exhibits strong spatial clustering in the eastern Meghna island upazilas.

Daulatkhan, Hijla and Tazumuddin show the highest mean detection frequency (6.4, 5.3 and 5.0 out of 11 monsoon seasons respectively), consistent with their position as low-lying islands surrounded by major river channels. Inland upazilas show substantially lower values. Barishal City Corporation returns a low frequency (0.46/11), consistent with known urban SAR scattering effects rather than necessarily reflecting lower inundation.

Moran's I = 0.51 (p = 0.001, 999 permutations) suggests strong positive spatial autocorrelation under queen contiguity weights — high-frequency upazilas tend to be adjacent to other high-frequency upazilas. This result is specific to upazila-level aggregation and the chosen threshold; it characterises spatial structure in the detection pattern, not flooding as a physical phenomenon.

---

## Key methodological decisions

**Why SAR:** C-band backscatter penetrates cloud cover. Calm open water produces characteristically low backscatter through specular reflection; this contrast is the physical basis for surface water detection during monsoon season.

**Temporal window:** July–September, fixed across all years. Chosen to capture peak monsoon conditions consistently.

**Orbit selection:** Four candidate orbits tested empirically over Barisal Division. Orbit 114 (ASCENDING) selected — the only orbit providing full spatial coverage across all 11 years with consistent scene counts.

**Aggregation then threshold:** Annual median composite computed per pixel across all scenes in each monsoon window, then a fixed threshold applied to the composite. Median compositing reduces scene-level speckle noise before classification, at the cost of smoothing within-season variability. This means the pipeline prioritises persistent seasonal water signals while reducing sensitivity to short-duration inundation events. The threshold defines what the pipeline treats as surface water presence — change it and the frequency surface changes. It is a methodological parameter, not a physical constant.

**Threshold value:** -16 dB, selected to separate open water from surrounding land cover in exploratory analysis, then held constant across all years.

---

## What this analysis cannot claim

This is an analysis of SAR backscatter under a fixed set of methodological choices. It cannot measure flood depth, duration or flow velocity. Dense vegetation canopy and urban structures both confound the signal. The resulting frequency surface reflects how the chosen preprocessing and thresholding scheme interprets low-backscatter SAR response as surface water presence, not an independent observation of inundation.

Results should not be interpreted as community-level flood exposure without additional field validation. This analysis does not replace operational mapping products produced by UNOSAT or Copernicus EMS.

---

## Repository structure

**data/** — Frequency raster (GeoTIFF) and upazila boundaries  
**gee-scripts/** — Google Earth Engine JavaScript pipeline  
**notebooks/** — Python analysis (zonal statistics, Moran's I, sensitivity testing)  
**outputs/** — Maps and figures  

**Tools:** Google Earth Engine · Python 3.11 · GeoPandas · Rasterio · rasterstats · PySAL · Matplotlib

---

## Status

- [x] Orbit selection and scene count audit
- [x] GEE pipeline — annual composites, thresholding, frequency raster
- [x] Zonal statistics — 43 upazilas
- [x] Moran's I spatial autocorrelation
- [x] Sensitivity testing — Jaccard ~0.78, RAE 22–28% under ±2dB threshold variation
- [x] Choropleth map
- [ ] QGIS cartographic output
- [ ] GitHub Pages

*Part 1 of 3 in the Barisal series. Pre-MSc portfolio project. MSc GIS and Remote Sensing, TU Dublin, September 2026.*