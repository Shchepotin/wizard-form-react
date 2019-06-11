import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// Actions
import { requestUserList } from '../../actions/userList';

// Styles
import styles from '../../styles';

const UserList = ({ userList, requestUserList }) => {
  useEffect(() => {
    requestUserList();
  }, [requestUserList]);

  return (
    <div>
      <table>
        <tbody>
          {userList.map(item => (
            <tr
              key={item.id}
            >
              <td>
                <img style={{ maxWidth: 50 }} src={item.avatar} alt="avatar" />
              </td>
              <td>
                <Link
                  to={`/user/view/${item.id}`}
                >
                  { item.email }
                </Link>
              </td>
              <td>
                { DateTime.fromJSDate(item.updatedAt).toRelative() }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  userList: PropTypes.array.isRequired,
  requestUserList: PropTypes.func.isRequired,
};

export default connect(({ userList }) => ({
  userList: userList.items,
}), {
  requestUserList,
})(withStyles(styles)(UserList));
