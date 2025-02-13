package com.thesis.nimbus.Service;

import com.thesis.nimbus.Model.Role;
import com.thesis.nimbus.Model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);
    void deleteRole (Long id);
    Role findByName (String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignUserToRole(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);

}
