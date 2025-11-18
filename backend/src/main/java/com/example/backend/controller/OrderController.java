package com.example.backend.controller;

import com.example.backend.model.Order;
import com.example.backend.model.OrderItem;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderItemRepository itemRepository;

    public OrderController(OrderRepository orderRepository, OrderItemRepository itemRepository) {
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @PostMapping("/{orderId}/items")
    public List<OrderItem> addItems(@PathVariable String orderId, @RequestBody List<OrderItem> items) {
        for (OrderItem item : items) {
            item.setOrder_id(orderId);
        }
        return itemRepository.saveAll(items);
    }
}
