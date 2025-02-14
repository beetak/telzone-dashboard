import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncBundles, getAllBundles, getLoadingStatus } from '../../../store/bundle-slice';
import { getToggleStatus } from '../../../store/toggle-slice';
import BundleCard from '../BundleCard/BundleCard';
import BeatLoader from "react-spinners/BeatLoader";

const BundleList = () => {
  const dispatch = useDispatch();
  const active = useSelector(getToggleStatus);
  const loading = useSelector(getLoadingStatus);

  useEffect(() => {
    dispatch(fetchAsyncBundles(active));
  }, [dispatch, active]);

  const bundles = useSelector(getAllBundles);

  let loadingAnimation = (
    <tr style={anime}>
      <td colSpan={6}>
        <BeatLoader
          color={'#055bb5'}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </td>
    </tr>
  );

  let renderedBundles = '';

  const count = Object.keys(bundles).length;
  if (count > 0) {
    renderedBundles = bundles.map((bundle, index) => (
      <tr key={index}>
        <BundleCard data={bundle} index={index} />
      </tr>
    ));
  } else {
    renderedBundles = (
      <tr>
        <td colSpan={7} className='text-center'>
          <h5 style={{ color: '#0C55AA' }}>No Bundles Found</h5>
        </td>
      </tr>
    );
  }

  let errorMsg = (
    <tr>
      <td colSpan={7} className='text-center'>
        <h5 style={{ color: '#E91E63' }}>Oops, something went wrong. Please refresh the page.</h5>
      </td>
    </tr>
  );

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Name
            </th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              Description
            </th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Amount</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Policy</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" style={customWidth}>Category</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">Data Cap</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading === 'pending' ? loadingAnimation :
              loading === 'rejected' ? errorMsg : renderedBundles
          }
        </tbody>
      </table>
    </div>
  );
}

export default BundleList;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const anime = {
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '10vh'
};

const customWidth = {
  width: "10px", // Set to 40px
  overflow: "hidden",
  whiteSpace: "nowrap", // Prevent text from wrapping
  textOverflow: "ellipsis" // Add ellipsis (...) for overflowed text
};